import React from "react";
import renderer from "react-test-renderer";
import localStorage from "./localstorage";
import { Provider } from "react-redux";
import store from "../store";
import NoteForm from "../components/notes/NoteForm";
import { render, fireEvent, waitFor, cleanup } from "@testing-library/react";
import { ADD_NOTE } from "../types";

const component = (
  <Provider store={store}>
    <NoteForm />
  </Provider>
);

afterEach(cleanup);

beforeAll(() => {
	global.console.error = jest.fn((...args) => {
		if (typeof args[0] === 'string' && args[0].includes('It looks like you\'re using the wrong act() around your test interactions')) {
	      return
	    }
	    return originalError.call(console, args)
	});
});

afterAll(() => {
  	global.console.error.mockRestore();
});

describe("Basic Ui", () => {
  //basic ui
  it("should render", async () => {
    const tree = await renderer.create(component).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should have  2 input components", () => {
    const { getByTestId } = render(component);
    expect(getByTestId("note-submit")).toHaveTextContent("Save");
    expect(getByTestId("note-title")).toBeRequired();
    expect(getByTestId("note-body")).toBeRequired();
  });
});

describe("Notes Form behaviour", () => {
    let testnote = {
        title: 'Test title',
        body: 'Test body'
    }
  it("empty fields", async () => {
    const { getByTestId, getByText } = render(component);

    fireEvent.change(getByTestId("note-title"), {
      target: { value: "" },
    });

    fireEvent.change(getByTestId("note-body"), {
      target: { value: "" },
    });
    fireEvent.click(getByTestId("note-submit"));
    expect(getByText("Add title")).toBeInTheDocument();
  });

  it("empty body", async () => {
    const { getByTestId, getByText } = render(component);

    fireEvent.change(getByTestId("note-title"), {
      target: { value: testnote.title },
    });

    fireEvent.change(getByTestId("note-body"), {
      target: { value: "" },
    });

    fireEvent.click(getByTestId("note-submit"));

    expect(getByText("Add a brief description")).toBeInTheDocument();
  });

  it("ideal add scenario", async () => {
    const { getByTestId, getByText, queryByText } = render(component);
    fireEvent.change(getByTestId("note-title"), {
      target: { value: testnote.title },
    });

    fireEvent.change(getByTestId("note-body"), {
      target: { value: testnote.body },
    });

    fireEvent.click(getByTestId("note-submit"));
    store.dispatch({type: ADD_NOTE, payload: {
        id: Math.floor(Math.random() * 10000),
        title: testnote.title,
        body: testnote.body
    }})
    await waitFor(() => {
        expect(getByTestId('note-title')).toHaveValue(''); 
        expect(getByTestId('note-body')).toHaveValue(''); 
        expect(queryByText("Add title")).not.toBeInTheDocument();
        expect(queryByText("Add a brief description")).not.toBeInTheDocument();
    });
  });
});

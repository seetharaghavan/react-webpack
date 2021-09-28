import React from "react";
import renderer from "react-test-renderer";
import localStorage from "./localstorage";
import { Provider } from "react-redux";
import store from "../store";
import Auth from "../components/auth/Auth";
import { render, fireEvent, waitFor, cleanup } from "@testing-library/react";
import { BASE_URL, LOG_IN } from "../types";
import axios from 'axios'; 
const {act} = renderer;


afterEach(cleanup);

const component = (
  <Provider store={store}>
    <Auth />
  </Provider>
);

const seedUser = {
  userName: "test",
  password: "test",
};

const originalError = global.console.error;
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

  it("should have  3 input components", () => {
    const { getByTestId } = render(component);
    expect(getByTestId("auth-submit")).toHaveTextContent("Submit");
    expect(getByTestId("userName")).toBeRequired();
    expect(getByTestId("password")).toBeRequired();
  });
});

describe("Form behaviour", () => {
  it("invalid user name", async () => {
    const { getByTestId, getByText } = render(component);

    fireEvent.change(getByTestId("userName"), {
      target: { value: "" },
    });

    fireEvent.change(getByTestId("password"), {
      target: { value: "" },
    });
    fireEvent.click(getByTestId("auth-submit"));
    expect(getByText("Enter valid user name")).toBeInTheDocument();
  });

  it("invalid password", async () => {
    const { getByTestId, getByText } = render(component);

    fireEvent.change(getByTestId("userName"), {
      target: { value: seedUser.userName },
    });

    fireEvent.change(getByTestId("password"), {
      target: { value: "" },
    });

    fireEvent.click(getByTestId("auth-submit"));

    expect(getByText("Enter valid password")).toBeInTheDocument();
  });

  it("ideal  scenario", async () => {
    const { getByTestId, getByText, queryByText } = render(component);
    fireEvent.change(getByTestId("userName"), {
      target: { value: seedUser.userName },
    });

    fireEvent.change(getByTestId("password"), {
      target: { value: seedUser.password },
    });

    await act(async () => {
        fireEvent.click(getByTestId("auth-submit"));
    })

    
    expect(queryByText("Enter valid password")).not.toBeInTheDocument();
    expect(queryByText("Enter valid user name")).not.toBeInTheDocument();
    expect(getByText("Loading")).toBeInTheDocument();
    
    await waitFor(() => {
        store.dispatch({ type: LOG_IN, payload: {token: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabc', userName: seedUser.userName}}); 
        expect(queryByText("Loading")).not.toBeInTheDocument()
    });
  });

});

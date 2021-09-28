import React from "react";
import renderer from "react-test-renderer";
import localStorage from "./localstorage";
import { Provider } from "react-redux";
import store from "../store";
import NoteItem from "../components/notes/NoteItem";
import { render, fireEvent, cleanup } from "@testing-library/react";

afterEach(cleanup);

describe("Note UI Test", () => {
  it("should render without crash", async () => {
    let notesItem = {
      title: "Test Body",
      body: "Test Body",
    };
    const tree = renderer
      .create(
        <Provider store={store}>
          <NoteItem noteInfo={notesItem} />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should render title and body", async () => {
    let notesItem = {
      title: "Test Title",
      body: "Test Body",
    };
    let { getByText } = render(
      <Provider store={store}>
        <NoteItem noteInfo={notesItem} />
      </Provider>
    );
    expect(getByText('Test Title')).toBeInTheDocument();
    expect(getByText('Test Body')).toBeInTheDocument();
  });
});

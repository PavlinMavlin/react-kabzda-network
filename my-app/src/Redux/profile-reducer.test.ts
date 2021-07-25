import {render, screen} from "@testing-library/react";
import App from "../App";
import React from "react";
import profileReducer, {addPostAC, deleteAC, InitialStateType} from "./profile-reducer";

const startState: InitialStateType = {
    posts: [
        {id: 1, message: 'Hi, how are you ?', likesCount: 15},
        {id: 2, message: "How is your kamasutra", likesCount: 10},
        {id: 3, message: "haha", likesCount: 10},
        {id: 4, message: "how are you", likesCount: 10},
    ], profile: null,
    status: "",
}
test('new post should be add', () => {

    const action = addPostAC("it kamasutraa")

    const newState = profileReducer(startState, action)

    expect(newState.posts.length).toBe(5);
});
test('message of newPost should be  it kamasutraa ', () => {

    const action = addPostAC("it kamasutraa")

    const newState = profileReducer(startState, action)

    expect(newState.posts[4].message).toBe("it kamasutraa");
});
test('after deleting length of message   should be decrement', () => {

    const action = deleteAC(4)

    const newState = profileReducer(startState, action)

    expect(newState.posts.length).toBe(3);
});
test('after deleting length of message   should not  be decrement if id is incorrect', () => {

    const action = deleteAC(100)

    const newState = profileReducer(startState, action)

    expect(newState.posts.length).toBe(4);
});

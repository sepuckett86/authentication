import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';

import Root from '../Root';
import Navbar from '../components/Navbar';
import App from '../components/App';
import Intro from '../components/Intro';
import Home from '../components/Home';
import Settings from '../components/Settings';
import LogIn from '../components/LogIn';


describe('when user is logged out', () => {
  let wrapped;

  afterEach(() => {
    wrapped.unmount();
  });

  it('has navbar with functional "Log In" link', () => {
    wrapped = mount(
      <Root initialState = {{ auth: false }}>
        <MemoryRouter initialEntries={[ '/' ]}>
          <Navbar />
        </MemoryRouter>
      </Root>
    );
    // Has Log In link
    expect(wrapped.render().text()).toContain('Log In');
    // Find Log In link and click it
    wrapped.find('.logIn').simulate('click');
    wrapped.update();
    expect(wrapped.render().text()).toContain('Log Out');
  });
  it('directs to "/intro" when "/" is requested', () => {
    wrapped = mount(
      <Root initialState = {{ auth: false }}>
        <MemoryRouter initialEntries={[ '/' ]}>
          <App />
        </MemoryRouter>
      </Root>
    );
    expect(wrapped.find(Intro).length).toEqual(1);
    expect(wrapped.find(Home).length).toEqual(0);
  });
  it('directs to "/login" when "/settings" is requested', () => {
    wrapped = mount(
      <Root initialState = {{ auth: false }}>
        <MemoryRouter initialEntries={[ '/settings' ]}>
          <App />
        </MemoryRouter>
      </Root>
    );
    expect(wrapped.find(LogIn).length).toEqual(1);
    expect(wrapped.find(Settings).length).toEqual(0);
  });
});


describe('when user is logged in', () => {
  let wrapped;

  afterEach(() => {
    wrapped.unmount();
  });
  it('has navbar with functional "Log Out" link', () => {
    wrapped = mount(
      <Root initialState = {{ auth: true }}>
        <MemoryRouter initialEntries={[ '/' ]}>
          <Navbar />
        </MemoryRouter>
      </Root>
    );
    // Has Log In link
    expect(wrapped.render().text()).toContain('Log Out');
    // Find Log In link and click it
    wrapped.find('.logIn').simulate('click');
    wrapped.update();
    expect(wrapped.render().text()).toContain('Log In');
  });
  it('does not direct to "/intro" when "/" is requested', () => {
    wrapped = mount(
      <Root initialState = {{ auth: true }}>
        <MemoryRouter initialEntries={[ '/' ]}>
          <App />
        </MemoryRouter>
      </Root>
    );
    expect(wrapped.find(Intro).length).toEqual(0);
    expect(wrapped.find(Home).length).toEqual(1);
  });
  it('does not direct to "/login" when "/settings" is requested', () => {
    wrapped = mount(
      <Root initialState = {{ auth: true }}>
        <MemoryRouter initialEntries={[ '/settings' ]}>
          <App />
        </MemoryRouter>
      </Root>
    );
    expect(wrapped.find(LogIn).length).toEqual(0);
    expect(wrapped.find(Settings).length).toEqual(1);
  });
});

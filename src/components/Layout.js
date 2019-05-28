import PropTypes from 'prop-types';

const Layout = ({ children }) => (
  <div className="app">
    <h1>Emoji Song Quiz 🤔</h1>
    <div className="content">{children}</div>
    <style jsx global>{`
      .app {
        width: 100%;
        height: 100vh;
        background-color: papayawhip;
      }
      .content {
        width: 60%;
        margin: 0 auto;
        padding-top: 10vh;
      }
      * {
        font-family: 'Comic Sans MS';
        color: crimson;
        margin: 0;
        padding: 0;
      }
      a {
        text-decoration: none;
        display: block;
        box-shadow: 0 2px tomato;
        width: fit-content;
        margin: 0 auto;
      }
      h1 {
        text-align: center;
        padding-top: 1rem;
      }
    `}</style>
  </div>
);

Layout.propTypes = {
  children: PropTypes.node,
};

export default Layout;

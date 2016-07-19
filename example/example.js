export default {
  tag: "div",
  props: {
    onClick: (e) => console.log(e),
    className: "hello"
  },
  children: [],
  node: null,
  shouldRender: function (newProps, newState) {
    return newProps !== this.props;
  },
  update: function (newProps, newState) {
    if (this.shouldRender(newProps, newState)) {
      this.node = this.render();
    }

    return this.node;
  },
  render: function () {
    return (
      div
    );
  }
}

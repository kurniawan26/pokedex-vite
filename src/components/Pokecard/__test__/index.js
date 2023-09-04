import renderer from "react-test-renderer";

test("Input is match the snapshot", () => {
  const component = renderer.create(Search);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

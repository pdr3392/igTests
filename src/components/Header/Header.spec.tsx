import { render, screen } from "@testing-library/react";
import { Header } from ".";

jest.mock("next/dist/client/router", () => {
  return {
    useRouter() {
      return {
        asPath: "/",
      };
    },
  };
});

jest.mock("next-auth/client", () => {
  return {
    useSession() {
      return [null, false];
    },
  };
});

describe("Header component", () => {
  //testing if component is mounted correctly
  it("renders correctly", () => {
    render(<Header />);

    //screen.logTestingPlaygroundURL();

    expect(
      screen.getByRole("link", {
        name: /home/i,
      })
    ).toBeInTheDocument();
    expect(screen.getByText("Posts")).toBeInTheDocument();
  });
});

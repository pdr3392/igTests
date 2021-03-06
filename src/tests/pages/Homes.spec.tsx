import { render, screen } from "@testing-library/react";
import Home, { getStaticProps } from "../../pages";
import { signIn, useSession } from "next-auth/client";
import { useRouter } from "next/dist/client/router";
import { stripe } from "../../services/stripe";
import { mocked } from "ts-jest/utils";

jest.mock("next/dist/client/router");
jest.mock("next-auth/client", () => {
  return {
    useSession: () => [null, false],
  };
});

jest.mock("../../services/stripe");

describe("Home page", () => {
  it("renders correctly", () => {
    render(<Home product={{ priceId: "fake-price-id", amount: "R$10,00" }} />);

    expect(screen.getByText("for R$10,00 month")).toBeInTheDocument();
  });

  it("loads initial data", async () => {
    const retrievePricesStripeMocked = mocked(stripe.prices.retrieve);

    retrievePricesStripeMocked.mockResolvedValueOnce({
      id: "fake-price-id",
      unit_amount: 1000,
    } as any);

    const response = await getStaticProps({});

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          product: {
            priceId: "fake-price-id",
            amount: "$10.00",
          },
        },
      })
    );
  });
});

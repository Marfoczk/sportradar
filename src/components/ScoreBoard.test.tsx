import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ScoreBoard } from "./ScoreBoard";

describe("ScoreBoard Component", () => {
  it("should render the scoreboard and default input states", () => {
    render(<ScoreBoard />);

    expect(screen.getByText("⚽ Football ScoreBoard")).toBeInTheDocument();
    expect(screen.getByText("📝 Update Score")).toBeInTheDocument();
    expect(screen.getByText("📊 Live Summary")).toBeInTheDocument();

    // Check if input fields are present and empty by default
    const homeTeamInput = screen.getByPlaceholderText("Home Team");
    const awayTeamInput = screen.getByPlaceholderText("Away Team");
    expect(homeTeamInput).toHaveValue("");
    expect(awayTeamInput).toHaveValue("");

    // Check if the "Select a match to update" option is selected by default
    const selectElement = screen.getByRole("combobox");
    expect(selectElement).toHaveValue("");
    expect(screen.getByText("Select a match to update")).toBeInTheDocument();

    // Check that score update inputs are not visible initially
    const homeScoreInput = screen.queryByDisplayValue("0");
    const awayScoreInput = screen.queryByDisplayValue("0");
    expect(homeScoreInput).not.toBeInTheDocument();
    expect(awayScoreInput).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /Update/i })
    ).not.toBeInTheDocument();
  });

  it("should update home and away score inputs when a game is selected", async () => {
    render(<ScoreBoard />);

    const selectElement = screen.getByRole("combobox");

    fireEvent.change(selectElement, { target: { value: "USA vs MEX" } });

    await waitFor(() => {
      expect(selectElement).toHaveValue("USA vs MEX");
    });

    // Check if the score input fields are now visible
    const homeScoreInput = screen.getByDisplayValue("5");
    const awayScoreInput = screen.getByDisplayValue("4");
    const updateButton = screen.getByRole("button", { name: /Update/i });

    expect(homeScoreInput).toBeInTheDocument();
    expect(awayScoreInput).toBeInTheDocument();
    expect(updateButton).toBeInTheDocument();

    // Verify the values displayed in the score inputs
    expect(homeScoreInput).toHaveValue(5);
    expect(awayScoreInput).toHaveValue(4);
  });

  it('should clear home and away score inputs and hide update section when "Select a match to update" is chosen', async () => {
    // given
    render(<ScoreBoard />);

    const selectElement = screen.getByRole("combobox");

    // when
    fireEvent.change(selectElement, { target: { value: "POL vs ENG" } });

    await waitFor(() => {
      expect(screen.getByDisplayValue("1")).toBeInTheDocument();
    });

    fireEvent.change(selectElement, { target: { value: "" } });

    await waitFor(() => {
      expect(selectElement).toHaveValue("");

    });

    // then
    expect(screen.queryByDisplayValue("1")).not.toBeInTheDocument();
    expect(screen.queryByDisplayValue("0")).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /Update/i })
    ).not.toBeInTheDocument();
  });
});

import { render, screen } from "@testing-library/react";
import { Badge } from "@/components";

describe("Badge Component", () => {
  it("renders children text", () => {
    render(<Badge>New</Badge>);
    expect(screen.getByText("New")).toBeInTheDocument();
  });

  it("renders with different variants", () => {
    const { rerender } = render(<Badge variant="success">Success</Badge>);
    expect(screen.getByText("Success")).toHaveClass("bg-green-100");

    rerender(<Badge variant="warning">Warning</Badge>);
    expect(screen.getByText("Warning")).toHaveClass("bg-yellow-100");
  });

  it("renders with different sizes", () => {
    const { rerender } = render(<Badge size="sm">Small</Badge>);
    expect(screen.getByText("Small")).toHaveClass("text-xs");

    rerender(<Badge size="lg">Large</Badge>);
    expect(screen.getByText("Large")).toHaveClass("text-base");
  });
});

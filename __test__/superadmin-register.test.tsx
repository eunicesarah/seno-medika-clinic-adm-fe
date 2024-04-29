import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import Register from "@/app/superadmin/register/page";

describe("Register page", () => {
  beforeEach(() => {
    render(<Register />);
  });

  it("should render name input", () => {
    const nameInput = screen.getByLabelText("Nama");
    expect(nameInput).toBeInTheDocument();
  });

  it("should render email input", () => {
    const emailInput = screen.getByLabelText("E-mail");
    expect(emailInput).toBeInTheDocument();
  });

  it("should render password input", () => {
    const passInput = screen.getByLabelText("Kata Sandi");
    expect(passInput).toBeInTheDocument();
  });

  it("should render role input", () => {
    const roleInput = screen.getByLabelText("Daftar Sebagai");
    expect(roleInput).toBeInTheDocument();
  });


  it("should update name input value when user types", () => {
    const nameInput = screen.getByLabelText("Nama") as HTMLInputElement;
    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    expect(nameInput.value).toBe("John Doe");
  });

  it("should update email input value when user types", () => {
    const emailInput = screen.getByLabelText("E-mail") as HTMLInputElement;
    fireEvent.change(emailInput, { target: { value: "john.doe@example.com" } });
    expect(emailInput.value).toBe("john.doe@example.com");
  });
});

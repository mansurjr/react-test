import GlobalStyles from "@mui/joy/GlobalStyles";
import CssBaseline from "@mui/joy/CssBaseline";
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Link from "@mui/joy/Link";
import Typography from "@mui/joy/Typography";
import Stack from "@mui/joy/Stack";
import BadgeRoundedIcon from "@mui/icons-material/BadgeRounded";
import { IconButton } from "@mui/material";
import { useUsers } from "../../api/users/useUsers";

export default function RegisterPage() {
  const { useRegister } = useUsers();
  const registerMutation = useRegister();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;

    const data = {
      username: (form.elements.namedItem("username") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      password: (form.elements.namedItem("password") as HTMLInputElement).value,
      role: (form.elements.namedItem("role") as HTMLInputElement).value,
    };

    registerMutation.mutate(data, {
      onSuccess: () => {
        form.reset();
        console.log("User registered successfully:", data);
      },
      onError: (error) => {
        console.error("Registration error:", error);
      },
    });
  };

  return (
    <>
      <CssBaseline />
      <GlobalStyles styles={{ ":root": { "--Form-maxWidth": "800px" } }} />

      <div className="flex min-h-screen">
        <div
          className="hidden md:block flex-1 bg-cover bg-center"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1527181152855-fc03fc7949c8?auto=format&w=1000&dpr=2)",
          }}
        />

        <div className="w-full md:w-1/2 flex justify-center items-center bg-white/20 backdrop-blur px-4">
          <div className="w-96 max-w-full flex flex-col">
            <header className="py-3 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <IconButton color="primary" size="small">
                  <BadgeRoundedIcon />
                </IconButton>
                <Typography level="title-lg">Company logo</Typography>
              </div>
            </header>

            <main className="my-2">
              <Stack className="gap-2 mb-2">
                <Typography component="h1" level="h3">
                  Register
                </Typography>
                <Typography level="body-sm">
                  Already have an account?{" "}
                  <Link href="/login" level="title-sm">
                    Sign in!
                  </Link>
                </Typography>
              </Stack>

              <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
                <FormControl required>
                  <FormLabel>Username</FormLabel>
                  <Input name="username" />
                </FormControl>

                <FormControl required>
                  <FormLabel>Email</FormLabel>
                  <Input type="email" name="email" />
                </FormControl>

                <FormControl required>
                  <FormLabel>Password</FormLabel>
                  <Input type="password" name="password" />
                </FormControl>

                <FormControl required>
                  <FormLabel>Role</FormLabel>
                  <Input name="role" defaultValue="ADMIN" />
                </FormControl>

                <Stack className="mt-2">
                  <Button type="submit" fullWidth>
                    Register
                  </Button>
                </Stack>
              </form>
            </main>

            <footer className="py-3">
              <Typography level="body-xs" className="text-center">
                © Your company {new Date().getFullYear()}
              </Typography>
            </footer>
          </div>
        </div>
      </div>
    </>
  );
}

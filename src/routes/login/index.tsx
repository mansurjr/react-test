import CssBaseline from "@mui/joy/CssBaseline";
import Button from "@mui/joy/Button";
import Checkbox from "@mui/joy/Checkbox";
import Divider from "@mui/joy/Divider";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Link from "@mui/joy/Link";
import Input from "@mui/joy/Input";
import Typography from "@mui/joy/Typography";
import Stack from "@mui/joy/Stack";
import BadgeRoundedIcon from "@mui/icons-material/BadgeRounded";
import { IconButton } from "@mui/material";

export default function LoginPage() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = {
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      password: (form.elements.namedItem("password") as HTMLInputElement).value,
      rememberMe: (form.elements.namedItem("rememberMe") as HTMLInputElement).checked,
    };
    console.log(data);
    form.reset()
  };

  return (
    <>
      <CssBaseline />

      <div className="flex min-h-screen">
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
                  Sign in
                </Typography>
                <Typography level="body-sm">
                  New to company?{" "}
                  <Link href="/register" level="title-sm">
                    Sign up!
                  </Link>
                </Typography>
              </Stack>

              <Divider>or</Divider>

              <form className="flex flex-col gap-2 mt-2" onSubmit={handleSubmit}>
                <FormControl required>
                  <FormLabel>Email</FormLabel>
                  <Input type="email" name="email" />
                </FormControl>
                <FormControl required>
                  <FormLabel>Password</FormLabel>
                  <Input type="password" name="password" />
                </FormControl>

                <Stack className="mt-2 gap-4">
                  <div className="flex justify-between items-center">
                    <Checkbox size="sm" label="Remember me" name="rememberMe" />
                    <Link level="title-sm" href="#replace-with-a-link">
                      Forgot your password?
                    </Link>
                  </div>
                  <Button type="submit" fullWidth>
                    Sign in
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

\        <div
          className="hidden md:block flex-1 bg-cover bg-center"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1527181152855-fc03fc7949c8?auto=format&w=1000&dpr=2)",
          }}
        />
      </div>
    </>
  );
}

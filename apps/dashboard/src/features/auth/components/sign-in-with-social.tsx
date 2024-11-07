import { useSignIn, useSignUp } from "@clerk/nextjs";
import type { OAuthStrategy } from "@clerk/types";
import { Button } from "@toolkit/ui/button";
import { useQueryStates } from "nuqs";
import { FaGoogle, FaLinkedinIn } from "react-icons/fa";
import { authSearchParams } from "../auth-search-params";

export function SignInWithSocial() {
  const { signIn } = useSignIn();
  const { signUp, setActive } = useSignUp();
  const [{ redirect_url }] = useQueryStates(authSearchParams, {
    shallow: true,
  });

  const signInWith = (strategy: OAuthStrategy) => {
    if (!signIn) return null;
    return signIn.authenticateWithRedirect({
      strategy,
      redirectUrl: "/auth/sso-callback",
      redirectUrlComplete: redirect_url || "/",
    });
  };

  async function handleSignIn(strategy: OAuthStrategy) {
    if (!signIn || !signUp) return null;

    // If the user has an account in your application, but does not yet
    // have an OAuth account connected to it, you can transfer the OAuth
    // account to the existing user account.
    const userExistsButNeedsToSignIn =
      signUp.verifications.externalAccount.status === "transferable" &&
      signUp.verifications.externalAccount.error?.code ===
        "external_account_exists";

    if (userExistsButNeedsToSignIn) {
      const res = await signIn.create({ transfer: true });

      if (res.status === "complete") {
        setActive({
          session: res.createdSessionId,
        });
      }
    }

    // If the user has an OAuth account but does not yet
    // have an account in your app, you can create an account
    // for them using the OAuth information.
    const userNeedsToBeCreated =
      signIn.firstFactorVerification.status === "transferable";

    if (userNeedsToBeCreated) {
      const res = await signUp.create({
        transfer: true,
      });

      if (res.status === "complete") {
        setActive({
          session: res.createdSessionId,
        });
      }
    } else {
      // If the user has an account in your application
      // and has an OAuth account connected to it, you can sign them in.
      signInWith(strategy);
    }
  }

  return (
    <section className="flex gap-2 my-6 px-4">
      <Button
        variant="outline"
        className="w-full"
        onClick={() => handleSignIn("oauth_google")}
      >
        <FaGoogle className="size-4 mr-2" />
        Google
      </Button>
      <Button
        variant="outline"
        className="w-full"
        onClick={() => handleSignIn("oauth_linkedin")}
      >
        <FaLinkedinIn className="size-4 mr-2" />
        LinkedIn
      </Button>
    </section>
  );
}

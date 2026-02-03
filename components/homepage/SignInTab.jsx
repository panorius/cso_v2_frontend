"use client";
import { SignInForm } from "./SignInForm";
import { Link } from "@heroui/react";
import { useTranslations } from "next-intl";

export const SignInTab = ({ onSignUpClick }) => {
    const t = useTranslations("auth");

    return (
        <>
            <SignInForm />

            <p className="px-6 pb-6 text-center text-small text-orange">
                <Link size="sm" className="text-orange">
                    {t("forgotPassword")}
                </Link>
                {" | "}
                <Link size="sm" className="text-orange" onPress={onSignUpClick}>
                    {t("dontHaveAccount")}
                </Link>
            </p>
        </>
    );
};

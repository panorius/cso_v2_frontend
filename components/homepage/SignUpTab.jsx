"use client";
import { SignUpForm } from "./SignUpForm";
import { Link } from "@heroui/react";
import { useTranslations } from "next-intl";

export const SignUpTab = ({ onLoginClick, onSuccess }) => {
    const t = useTranslations("auth");

    return (
        <>
            <SignUpForm onSuccess={onSuccess} />
            <p className="px-6 pb-6 text-center text-small text-orange">
                <Link size="sm" className="text-orange" onPress={onLoginClick}>
                    {t("alreadyHaveAccount")}
                </Link>
            </p>
        </>
    );
};

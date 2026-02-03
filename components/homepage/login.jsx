"use client";
import { StyledTabs } from "@/components/ui/tabs";
import { SignInTab } from "./SignInTab";
import { SignUpTab } from "./SignUpTab";
import { useState } from "react";
import { Card, CardBody } from "@heroui/react";
import { useTranslations } from "next-intl";
import { useAuthRedirect } from "@/lib/hooks/useAuthRedirect";
import { RunningCharacterLoader } from "@/components/ui/RunningCharacterLoader";

const LoginPage = () => {
    const t = useTranslations("auth");
    const tCommon = useTranslations("common");
    const [selected, setSelected] = useState("login");

    // Rediriger si déjà connecté
    const { isRedirecting } = useAuthRedirect();

    const handleSignupSuccess = () => {
        setSelected("login");
    };

    // Afficher le loader pendant la redirection
    if (isRedirecting) {
        return <RunningCharacterLoader message={tCommon("loading")} />;
    }

    return (
        <div className="flex flex-col items-center justify-start w-full">
            <Card className="w-full max-w-[400px] bg-grey-darker shadow-none!">
                <CardBody className="p-0 overflow-hidden">
                    <StyledTabs
                        fullWidth
                        aria-label="Tabs form"
                        selectedKey={selected}
                        size="lg"
                        disableCursorAnimation
                        borderRadius="xl"
                        onSelectionChange={setSelected}
                        items={[
                            {
                                key: "login",
                                title: t("login"),
                                content: (
                                    <SignInTab
                                        onSignUpClick={() =>
                                            setSelected("sign-up")
                                        }
                                    />
                                ),
                            },
                            {
                                key: "sign-up",
                                title: t("signup"),
                                content: (
                                    <SignUpTab
                                        onLoginClick={() =>
                                            setSelected("login")
                                        }
                                        onSuccess={handleSignupSuccess}
                                    />
                                ),
                            },
                        ]}
                    />
                </CardBody>
            </Card>
        </div>
    );
};

export default LoginPage;

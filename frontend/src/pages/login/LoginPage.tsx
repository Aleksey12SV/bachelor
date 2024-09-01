import { useKeycloak } from "@/components/auth/KeycloakProvider";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

const LoginPage = () => {
  const { t } = useTranslation();
  const { keycloakInstance, authenticated, logout } = useKeycloak();
  return (
    <div className="flex flex-auto -mt-[200px] items-center justify-center">
      {!authenticated ? (
        <Button className="w-[200px]" onClick={() => keycloakInstance?.login()}>{t("login")}</Button>
      ) : (
        <div className="flex flex-col min-w-[300px] gap-4">
          <span>{t('alreadyLoggedIn')}</span>
          <Button onClick={logout}>{t("logout")}</Button>
        </div>
      )}
    </div>
  );
};

export default LoginPage;

import { useTranslation } from "react-i18next";

const I18nSample = () => {
  const { t } = useTranslation();
  return <div>{t("test")}</div>;
};

export default I18nSample;

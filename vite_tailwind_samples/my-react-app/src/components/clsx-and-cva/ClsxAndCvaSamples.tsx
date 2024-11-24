import ClsxSample from "./ClsxSample";
import { CvaSample } from "./CvaSample";

export const ClsxAndCvaSamples = () => {
  return (
    <>
      <div>
        <ClsxSample intent="danger" />
      </div>
      <div>
        <CvaSample intent={"primary"} size={"small"}>
          Button
        </CvaSample>
      </div>
    </>
  );
};

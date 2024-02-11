import React, { useState } from "react";
import s from "./UpdatePassword.module.scss";
import AddJobInput from "../../jobs/activeJobs/addJobInput/AddJobInput";
import { useTranslation } from "react-i18next";
import MyButton from "../../../UI-components/button/MyButton";

const UpdatePassword = () => {
  const { t } = useTranslation();

  const [currentPass, setCurrentPass] = useState();
  const [newPass, setNewPass] = useState();
  const [repeatPass, setRepeatPass] = useState();

  return (
    <>
      <div className={s.updatePassword}>
        <div className={s.wrapper}>
          <div className={s.inputBlock}>
            <AddJobInput
              className={s.input}
              label={t("profile.passwordOld")}
              onChange={(value) => setCurrentPass(value)}
              value={currentPass}
              type={'password'}
            />
            <AddJobInput
              className={s.input}
              label={t("profile.passwordNew")}
              onChange={(value) => setNewPass(value)}
              value={newPass}
              type={'password'}
            />
            <AddJobInput
              className={s.input}
              label={t("profile.passwordNewAgain")}
              onChange={(value) => setRepeatPass(value)}
              value={repeatPass}
              type={'password'}
            />
            <p className={s.error}>{newPass !== repeatPass ? 'Password are different' : ''}</p>
          </div>
          <MyButton
            className={s.button}
            // title={
            //   state.addCandidate.loading ? (
            //     <Loader width={"30px"} height={"30px"} />
            //   ) : (
            //     t("profile.update")
            //   )
            // }
            disabled={currentPass === '' || newPass === '' || repeatPass === '' ? 'true' : newPass !== repeatPass ? 'true' : ''}
            justContent={"left"}
            onClick={() => console.log('click')}
            // isLoading={state.addCandidate.loading}
          />
        </div>
      </div>
    </>
  );
};

export default UpdatePassword;

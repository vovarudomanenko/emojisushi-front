import { useState } from "react";
import { observer, useLocalObservable } from "mobx-react";
import * as S from "./styled";
import { FlexBox, Input, ButtonDark, ButtonOutline } from "src/components";
import { useLoaderData, useNavigate } from "react-router-dom";

import { TextInputModel, FormModel } from "src/common/models";
import { useTranslation } from "react-i18next";
import { User } from "src/models";
import { requireUser } from "~utils/loader.utils";

const EditForm = observer(
  ({ cancelEditing }: { cancelEditing: () => void }) => {
    const { user: userJson } = useLoaderData() as Awaited<
      ReturnType<typeof loader>
    >;
    const user = new User(userJson);
    const customer = user.customer;
    const { t } = useTranslation();

    const form = useLocalObservable(
      () =>
        new FormModel({
          fields: {
            name: new TextInputModel("name", {
              value: user.name,
            }),
            surname: new TextInputModel("surname", {
              value: user.surname,
            }),
            phone: new TextInputModel("phone", {
              value: user.phone,
            }),
          },
          onSubmit(fields, done, error) {
            user.name = fields.name.value;
            customer.firstName = fields.name.value;
            user.surname = fields.surname.value;
            customer.lastName = fields.surname.value;
            user.phone = fields.phone.value;

            user
              .save()
              .then(() => {
                cancelEditing();
              })
              .catch((e) => {
                error(e);
              })
              .finally(() => {
                done();
              });
          },
        })
    );

    return (
      <form {...form.asProps}>
        <FlexBox justifyContent={"space-between"}>
          <Input
            style={{ width: "calc(50% - 10px)" }}
            label={t("common.first_name")}
            {...form.fields.name.asProps}
          />
          <Input
            style={{ width: "calc(50% - 10px)" }}
            label={t("common.last_name")}
            {...form.fields.surname.asProps}
          />
        </FlexBox>
        <FlexBox
          justifyContent={"space-between"}
          style={{
            marginTop: "10px",
          }}
        >
          <Input
            style={{ width: "calc(50% - 10px)" }}
            label={t("common.email")}
            name={"email"}
            value={user.email}
            disabled={true}
          />
          <Input
            style={{ width: "calc(50% - 10px)" }}
            label={t("common.phone")}
            {...form.fields.phone.asProps}
          />
        </FlexBox>

        <FlexBox
          style={{
            marginTop: "30px",
          }}
        >
          <ButtonOutline
            {...form.asSubmitButtonProps}
            style={{
              marginRight: "16px",
            }}
          >
            {" "}
            {t("common.save")}
          </ButtonOutline>
          <ButtonDark
            onClick={() => {
              cancelEditing();
            }}
          >
            {t("common.cancel")}
          </ButtonDark>
        </FlexBox>
      </form>
    );
  }
);

const ProfilePreview = ({ startEditing }: { startEditing: () => void }) => {
  const { user: userJson } = useLoaderData() as Awaited<
    ReturnType<typeof loader>
  >;
  const user = new User(userJson);
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <S.Properties>
      <S.Property>
        <S.Property.Label>{t("common.first_name")}</S.Property.Label>
        <S.Property.Value>{user.fullName}</S.Property.Value>
      </S.Property>

      <S.Property>
        <S.Property.Label>{t("common.email")}</S.Property.Label>
        <S.Property.Value>{user.email}</S.Property.Value>
      </S.Property>
      <S.Property>
        <S.Property.Label>{t("common.phone")}</S.Property.Label>
        <S.Property.Value>{user.phone}</S.Property.Value>
      </S.Property>

      <S.BtnGroup>
        <ButtonDark
          onClick={() => {
            startEditing();
          }}
          minWidth={"309px"}
        >
          {t("account.profile.editProfile")}
        </ButtonDark>
        <S.BtnWrapper>
          <ButtonDark
            onClick={() => {
              navigate("/account/recover-password");
            }}
            minWidth={"202px"}
          >
            {t("account.profile.changePassword")}
          </ButtonDark>
        </S.BtnWrapper>
      </S.BtnGroup>
    </S.Properties>
  );
};

export const ProfilePage = () => {
  const [editModeEnabled, setEditModeEnabled] = useState(false);

  return editModeEnabled ? (
    <EditForm cancelEditing={() => setEditModeEnabled(false)} />
  ) : (
    <ProfilePreview startEditing={() => setEditModeEnabled(true)} />
  );
};

export const Component = ProfilePage;
Object.assign(Component, {
  displayName: "LazyProfilePage",
});

export const loader = async () => {
  const user = await requireUser();

  return {
    user,
  };
};

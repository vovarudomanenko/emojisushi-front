import { FlexBox, Input, ButtonDark, ButtonOutline } from "src/components";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { authApi } from "~api";
import { AxiosError } from "axios";
import { useUser } from "~hooks/use-auth";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { queryClient } from "~query-client";
import { AUTHENTICATED_USER_QUERY_KEY } from "~common/constants";
import { IUser } from "~api/types";

export const EditProfilePage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data: user } = useUser();
  const [errors, setErrors] = useState<{
    name?: string[];
    surname?: string[];
    phone?: string[];
  }>({});

  const mutation = useMutation({
    mutationFn: ({
      name,
      surname,
      phone,
    }: {
      name: string;
      surname: string;
      phone: string;
    }) => {
      return authApi.updateUser({
        name,
        surname,
        phone,
      });
    },
    onError: (e) => {
      if (e instanceof AxiosError) {
        if (e.response.status === 422) {
          setErrors(e.response.data.errors);
        }
      }
    },
    onSuccess: (res) => {
      queryClient.setQueryData(
        AUTHENTICATED_USER_QUERY_KEY,
        (oldUser: IUser) => {
          return {
            ...oldUser,
            ...res.data,
          };
        }
      );
      navigate("./../");
    },
    onSettled: () => {
      queryClient.invalidateQueries(AUTHENTICATED_USER_QUERY_KEY);
    },
  });

  return (
    <form
      style={{
        marginTop: 20,
      }}
      method="post"
      onSubmit={(e) => {
        e.preventDefault();
        setErrors({});

        const formData = new FormData(e.currentTarget);
        const name = formData.get("name");
        const surname = formData.get("surname");
        const phone = formData.get("phone");

        mutation.mutate({
          name: name + "",
          surname: surname + "",
          phone: phone + "",
        });
      }}
    >
      <FlexBox justifyContent={"space-between"}>
        <Input
          style={{ width: "calc(50% - 10px)" }}
          label={t("common.first_name")}
          defaultValue={user.name}
          name="name"
          error={errors?.name?.[0]}
        />
        <Input
          style={{ width: "calc(50% - 10px)" }}
          label={t("common.last_name")}
          defaultValue={user.surname}
          name="surname"
          error={errors?.surname?.[0]}
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
          defaultValue={user.phone}
          error={errors?.phone?.[0]}
          name="phone"
        />
      </FlexBox>

      <FlexBox
        style={{
          marginTop: "30px",
        }}
      >
        <ButtonOutline
          submitting={mutation.isLoading}
          style={{
            marginRight: "16px",
          }}
        >
          {t("common.save")}
        </ButtonOutline>
        <ButtonDark type="button" onClick={() => navigate("./../")}>
          {t("common.cancel")}
        </ButtonDark>
      </FlexBox>
    </form>
  );
};

export const Component = EditProfilePage;
Object.assign(Component, {
  displayName: "LazyEditProfilePage",
});

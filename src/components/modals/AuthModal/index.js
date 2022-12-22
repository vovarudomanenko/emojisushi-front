import {Modal} from "../Modal";
import * as S from "./styled";
import {cloneElement, useState} from "react";
import {Input} from "../../Input";
import {Button} from "../../buttons/Button";
import {Checkbox} from "../../Checkbox";
import {PasswordInput} from "../../PasswordInput";
import {useBreakpoint} from "../../../common/hooks/useBreakpoint";
import {FlexBox} from "../../FlexBox";
import AuthApi from "../../../api/auth.api";
import LocalStorageService from "../../../services/local-storage.service";
import authApi from "../../../api/auth.api";
import {observer, useLocalObservable} from "mobx-react";
import {runInAction, transaction} from "mobx";
import {stores} from "../../../stores/stores";
import {useNavigate} from "react-router-dom";

export const AuthModal = ( { children}) => {
    const breakpoint = useBreakpoint();
    const isMobile = breakpoint === 'mobile';

    const [showPasswordRecovery, setShowPasswordRecovery] = useState();
    const [showSignUp,  setShowSignUp]  = useState(false);
    const showLoginForm = isMobile ? !showPasswordRecovery && !showSignUp: !showPasswordRecovery;
    const showSignUpForm = (!isMobile || showSignUp);

    return <Modal width={isMobile ? "350px" : "675px"}  render={({close}) => (

        <S.Wrapper>
            {showLoginForm && (
               <LoginForm
                 setShowSignUp={setShowSignUp}
                 setShowPasswordRecovery={setShowPasswordRecovery}
               />
            )}
            {showPasswordRecovery && (
                <PasswordRecoveryForm
                  setShowPasswordRecovery={setShowPasswordRecovery}
                />
            )}
            {!isMobile &&
                <S.VerticalBar/>
            }
            {showSignUpForm &&
                <SignUpForm/>
            }
        </S.Wrapper>
    )}>
        {cloneElement(children)}
    </Modal>;
}

const SignUpForm = ({
                        setShowSignUp
                    }) => {
    const breakpoint = useBreakpoint();
    const isMobile = breakpoint === 'mobile';
    const [signupEmail, setSignupEmail] = useState();
    const [signupEmailError, setSignupEmailError] = useState("");
    const [signupPassword, setSignupPassword] = useState();
    const [signupPasswordError, setSignupPasswordError] = useState("");
    const [signupAgree, setSignupAgree] = useState(false);
    const [signupAgreeError, setSignupAgreeError] = useState("");

    return <S.SignUpForm onSubmit={e => {
        setSignupPasswordError('');
        setSignupEmailError('');
        e.preventDefault();
    }}>
        <S.Title>
            Регистрация
        </S.Title>
        <S.InputWrapper>
            <S.InputLabel>
                E-mail
            </S.InputLabel>
            <Input error={signupEmailError} onChange={e => {
                const {value} = e.currentTarget;
                setSignupEmail(value);
                setSignupEmailError("");
            }} light={true}/>
        </S.InputWrapper>

        <S.InputWrapper>
            <S.InputLabel>
                Пароль
            </S.InputLabel>
            <PasswordInput light={true} error={signupPasswordError} onChange={e => {
                const {value} = e.currentTarget;
                setSignupPassword(value);
                setSignupPasswordError("");
            }}/>
        </S.InputWrapper>
        <S.CheckboxWrapper>
            <Checkbox error={signupAgreeError}
                      name={"agree"}
                      initialChecked={signupAgree}
                      onChange={state => {
                          setSignupAgree(state);
                      }}>
                Я согласен с условиями использования и обработки моих персональных данных
            </Checkbox>
        </S.CheckboxWrapper>


        <FlexBox>
            <FlexBox flexDirection={"column"} alignItems={"center"}>

                <Button onClick={() => {
                    setSignupAgreeError("");
                    AuthApi.register({
                        email: signupEmail,
                        password: signupPassword,
                        password_confirmation: signupPassword,
                        agree: signupAgree,
                        name: 'Не указано',
                        surname: 'Не указано'
                    }).then(() => {
                        console.log('Пользователь успешно зарегистрировался')
                    }).catch((e) => {
                        const {errors, message} = e.response.data;
                        if(errors) {
                            Object.keys(errors).forEach((key) => {
                                if(key === 'email') {
                                    setSignupEmailError(errors[key][0]);
                                }
                                if(key === 'password') {
                                    setSignupPasswordError(errors[key][0]);
                                }
                                if(key === 'agree') {
                                    setSignupAgreeError(errors[key][0]);
                                }
                            })
                        }
                        console.error('Регистрация пользователя провалилась')
                        console.error(e);
                    })

                }}>Регистрация</Button>
                {isMobile &&
                  <S.NavigateButton style={{paddingTop:"10px"}} onClick={ (e)=>{
                      e.preventDefault();
                      setShowSignUp(false)
                  }
                  }>
                      Вход
                  </S.NavigateButton>
                }
            </FlexBox>
        </FlexBox>
    </S.SignUpForm>
}

const PasswordRecoveryForm = observer(({
                                  setShowPasswordRecovery
                              }) => {
    const state = useLocalObservable(() => ({
        email: '',
        loading: false,
        isSent: false,
        error: ''
    }))
    return                 <S.LoginForm onSubmit={(e) => {
           e.preventDefault();
    }}>
        <S.Title>
            Восстановление пароля
        </S.Title>
        <S.InputWrapper>
            <S.InputLabel>
                E-mail
            </S.InputLabel>
            <Input error={state.error} light={true} onChange={e => {
                runInAction(() => {
                    state.error = '';
                    state.email = e.target.value;
                })
            }}/>
        </S.InputWrapper>
        {state.isSent ? (
          <S.ForgotPassText style={{
              color: 'green'
          }}>
              Пожалуйста проверьте Вашу почту. Мы отправили Вам письмо содержащее ссылку для восстановления пароля
          </S.ForgotPassText>
        ): (
          <S.ForgotPassText>
              Введите Ваш E-mail адрес для которого необходимо скинуть пароль
          </S.ForgotPassText>
        )}
        <S.BtnGroup>
            <S.NavigateButton onClick={ (e) => {
                setShowPasswordRecovery(false)
            }} >Назад</S.NavigateButton>
            <Button loading={state.loading} onClick={() => {
                runInAction(() => {
                    state.loading = true;
                    state.error = '';
                })
                authApi.restorePassword(state.email).then(() => {
                    runInAction(() => {
                        state.isSent = true;
                        state.email = '';
                    })
                }).catch((e) => {
                    const {errors} = e.response.data;
                    if(errors) {
                        Object.keys(errors).forEach((key) => {
                            if(key === 'email') {
                                runInAction(() => {
                                    state.error = errors[key][0]
                                })
                            }
                        })
                    }
                }).finally(() => {
                    runInAction(() => {
                        state.loading = false;
                    })
                });
            }}>Восстановить</Button>
        </S.BtnGroup>

    </S.LoginForm>
})

const LoginForm = ({
  setShowSignUp,
  setShowPasswordRecovery
                   }) => {
    const navigate = useNavigate();
    const [login, setLogin] = useState("");
    const [loginError, setLoginError] = useState("");
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [loading, setLoading] = useState(false);
    const breakpoint = useBreakpoint();
    const isMobile = breakpoint === 'mobile';

    return  <S.LoginForm onSubmit={(e) => {
        e.preventDefault();
    }}>
        <S.Title>
            Войти в аккаунт
        </S.Title>
        <S.InputWrapper>
            <S.InputLabel>
                E-mail
            </S.InputLabel>
            <Input error={loginError} onChange={(e) => {
                setLogin(e.target.value);
                setLoginError('');
            }} light={true}/>
        </S.InputWrapper>
        <S.InputWrapper>
            <S.InputLabel>
                Пароль
            </S.InputLabel>
            <PasswordInput error={passwordError} onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError('');
            }} light={true}/>

        </S.InputWrapper>
        <FlexBox justifyContent={"flex-end"}>
            <S.NavigateButton style={{paddingTop: "10px"}} onClick={ (e) => {
                setShowPasswordRecovery(true)
            }}>Забыли пароль?</S.NavigateButton>
        </FlexBox>

        <Button loading={loading} onClick={() => {
            setLoginError('');
            setPasswordError('');
            setLoading(true);
            AuthApi.login({
                email: login,
                password: password,
            }).then((res) => {
                const {token, expires, user} = res.data.data;
                LocalStorageService.set('jwt', token);
                transaction(() => {
                    stores.AuthStore.setAuthToken(token);
                    stores.AuthStore.setUser(user);
                    stores.AuthStore.setExpires(expires);
                })
                navigate('/account');

            }).catch((e) => {
                const {errors, message} = e.response.data;
                if(errors) {
                    Object.keys(errors).forEach((key) => {
                        if(key === 'email') {
                            setLoginError(errors[key][0]);
                        }
                        if(key === 'password') {
                            setPasswordError(errors[key][0]);
                        }
                    })
                } else {
                    setLoginError(message);
                }
            }).finally(() => {
                setLoading(false);
            })
        }} style={{marginTop: "20px", display: "flex"}}>Войти</Button>

        {isMobile &&

          <S.NavigateButton style={{paddingTop: "10px"}} onClick={ (e) => {
              e.preventDefault();
              setShowSignUp(true)
          }}>Регистрация</S.NavigateButton>

        }


    </S.LoginForm>
}

import { Footer } from '@/components';
import { authLogin } from '@/services/auth';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { LoginForm, ProFormCheckbox, ProFormText } from '@ant-design/pro-components';
import { Helmet, Link, useModel } from '@umijs/max';
import { message } from 'antd';
import { createStyles } from 'antd-style';
import React from 'react';
import { flushSync } from 'react-dom';
import Settings from '../../../../config/defaultSettings';
const useStyles = createStyles(({ token }) => {
  return {
    action: {
      marginLeft: '8px',
      color: 'rgba(0, 0, 0, 0.2)',
      fontSize: '24px',
      verticalAlign: 'middle',
      cursor: 'pointer',
      transition: 'color 0.3s',
      '&:hover': {
        color: token.colorPrimaryActive,
      },
    },
    lang: {
      width: 42,
      height: 42,
      lineHeight: '42px',
      position: 'fixed',
      right: 16,
      borderRadius: token.borderRadius,
      ':hover': {
        backgroundColor: token.colorBgTextHover,
      },
    },
    container: {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'auto',
      backgroundImage:
        "url('https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr')",
      backgroundSize: '100% 100%',
    },
  };
});

const Login: React.FC = () => {
  // const [userLoginState, setUserLoginState] = useState<AUTH.UserResponse>({});
  const { setInitialState } = useModel('@@initialState');
  const { styles } = useStyles();
  const handleSubmit = async (values: AUTH.LoginRequest) => {
    try {
      // 登录
      const user = await authLogin({ ...values });
      if (user) {
        const defaultLoginSuccessMessage = '登录成功！';
        message.success(defaultLoginSuccessMessage);
        // await fetchUserInfo();
        flushSync(() => {
          setInitialState((s) => ({
            ...s,
            currentUser: user,
          }));
        });
        const urlParams = new URL(window.location.href).searchParams;
        window.location.href = urlParams.get('redirect') || '/';
        return;
      }
      throw new Error('用户名或密码错误!');
    } catch (error) {
      const defaultLoginFailureMessage = '用户名或密码错误！';
      console.log(error);
      message.error(defaultLoginFailureMessage);
    }
  };
  return (
    <div className={styles.container}>
      <Helmet>
        <title>
          {'登录'}- {Settings.title}
        </title>
      </Helmet>
      <div
        style={{
          flex: '1',
          padding: '80px 0',
        }}
      >
        <LoginForm
          contentStyle={{
            minWidth: 280,
            maxWidth: '75vw',
            marginTop: '50px',
          }}
          logo={<img alt="logo" src="/logo.svg" />}
          title="用户中心"
          subTitle={'基于SpringBoot、Mybatis-plus、Ant Design Pro 的用户中心项目'}
          initialValues={{
            autoLogin: false,
          }}
          onFinish={async (values) => {
            await handleSubmit(values as AUTH.LoginRequest);
          }}
        >
          <>
            <ProFormText
              name="username"
              initialValue="lvpb"
              fieldProps={{
                size: 'large',
                prefix: <UserOutlined />,
              }}
              placeholder={'用户名: admin or auth'}
              rules={[
                {
                  required: true,
                  message: '用户名是必填项！',
                },
                {
                  type: 'string',
                  min: 4,
                  max: 15,
                  message: '用户名长度不能小于4位大于15位！',
                },
              ]}
            />
            <ProFormText.Password
              name="password"
              initialValue="123456789"
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined />,
              }}
              placeholder={'密码: admin'}
              rules={[
                {
                  required: true,
                  message: '密码是必填项！',
                },
                {
                  type: 'string',
                  min: 8,
                  max: 20,
                  message: '密码长度不能小于8位大于20位！',
                },
              ]}
            />
          </>
          <div style={{ marginBottom: 24 }}>
            <ProFormCheckbox noStyle name="autoLogin">
              自动登录
            </ProFormCheckbox>
            <Link to="/auth/register" style={{ float: 'right' }}>
              注册
            </Link>
          </div>
        </LoginForm>
      </div>
      <Footer />
    </div>
  );
};
export default Login;

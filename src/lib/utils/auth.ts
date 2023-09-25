import { Auth } from 'aws-amplify';
import type { User } from '$lib/types/auth';

/**
 * REGISTRATION
 *
 */

type SignUpParameters = {
	username: string;
	password: string;
	email: string;
	// phoneNumber: string;
};

export async function signUp({ username, password, email }: SignUpParameters) {
	const { user, userConfirmed, userSub } = await Auth.signUp({
		username,
		password,
		attributes: {
			email // optional
			// phoneNumber, // optional - E.164 number convention
			// other custom attributes
		},
		autoSignIn: {
			// optional - enables auto sign in after user is confirmed
			enabled: true
		}
	});
	return user;
}
type ConfirmSignUpParameters = {
	username: string;
	code: string;
};

export async function confirmSignUp({ username, code }: ConfirmSignUpParameters) {
	return await Auth.confirmSignUp(username, code, { forceAliasCreation: false });
}


export async function resendSignUp({ username }:{username:string}) {
	return await Auth.resendSignUp(username);
}

/**
 * SIGN IN
 */

type SignInParameters = {
	username: string;
	password: string;
};

export async function signIn({ username, password }: SignInParameters) {
	return await Auth.signIn(username, password);
}

/**
 * SIGN out
 */

export async function signOut() {
	await Auth.signOut({ global: true });
}



/**
 * FORGOTTEN PWD CONFIRM CODE
 */

// Send confirmation code to user's email
export async function forgotPassword(username: string) {
	return await Auth.forgotPassword(username);
}

/**
 * FORGOTTEN PWD CONFIRM CODE SUBMIT
 */
// Collect confirmation code and new password
export async function forgotPasswordSubmit(username: string, code: string, newPassword: string) {
	return await Auth.forgotPasswordSubmit(username, code, newPassword);
}

export async function currentUserInfo() {
	return await Auth.currentUserInfo();
};

export async function currentAuthenticatedUser() {
	return await Auth.currentAuthenticatedUser({
		bypassCache: false // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
	  });
  };

export async function getCurrentSession() {
	return await Auth.currentSession();
  };

export async function updateUserAttributes (user:User, attributes:{[x:string]:any}) {
	return await Auth.updateUserAttributes(user, attributes);
};

/**
 * PWD CHANGE
 */
export async function changePassword(user: User, oldPassword: string, newPassword: string) {
	return await Auth.changePassword(user, oldPassword, newPassword);
}

export async function isEmailValid(email: string): Promise<boolean> {
	// Regular expression for validating an email address
	const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
	return emailRegex.test(email);
  }


export async function updateUserEmail(user:User, new_email:string) {
	if(await isEmailValid(new_email) == false){
		throw new Error('you must provide a valid email')
	}

	return await Auth.updateUserAttributes(user, {
		email: new_email
	});
	
  }

export async function verifyEmailValidationCode(code: string) {
	return await Auth.verifyCurrentUserAttributeSubmit('email', code);
  }

  export async function deleteUser() {
	return await Auth.deleteUser();
  }
import { localStorageStore } from '@skeletonlabs/skeleton';
import { redirect } from '@sveltejs/kit';
import { Auth } from 'aws-amplify';
import { user as userStore } from '$lib/stores/auth';
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
	try {
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
	} catch (error) {
		console.log('error signing up user:', error);
	}
}
type ConfirmSignUpParameters = {
	username: string;
	code: string;
};

export async function confirmSignUp({ username, code }: ConfirmSignUpParameters) {
	try {
		return await Auth.confirmSignUp(username, code, { forceAliasCreation: false });
	} catch (error) {
		console.log('error confirming sign up', error);
	}
}


export async function resendSignUp({ username }:{username:string}) {
	try {
		return await Auth.resendSignUp(username);
	} catch (error) {
		console.log('error', error);
	}
}

/**
 * SIGN IN
 */

type SignInParameters = {
	username: string;
	password: string;
};

export async function signIn({ username, password }: SignInParameters) {
	try {
		return await Auth.signIn(username, password);
	} catch (error) {
		console.log('error signing in', error);
	}
}

/**
 * SIGN out
 */

export async function signOut() {
	try {
		await Auth.signOut({ global: true });
	} catch (error) {
		console.log('Error signing out: ', error);
	}
}



/**
 * FORGOTTEN PWD CONFIRM CODE
 */

// Send confirmation code to user's email
export async function forgotPassword(username: string) {
	try {
		return await Auth.forgotPassword(username);
	} catch (err) {
		console.log(err);
	}
}

/**
 * FORGOTTEN PWD CONFIRM CODE SUBMIT
 */
// Collect confirmation code and new password
export async function forgotPasswordSubmit(username: string, code: string, newPassword: string) {
	try {
		return await Auth.forgotPasswordSubmit(username, code, newPassword);
	} catch (err) {
		console.log(err);
	}
}

// async function completeNewPassword(username: string, password: string) {
// 	try {
// 		const user = await Auth.signIn(username, password);

// 		if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
// 			const { requiredAttributes } = user.challengeParam; // the array of required attributes, e.g ['email', 'phone_number']
// 		}
// 		const newPassword = 'newPassword';
// 		const loggedInUser = await Auth.completeNewPassword(
// 			user, // the Cognito User Object
// 			newPassword, // the new password
// 			// OPTIONAL, the required attributes
// 			{
// 				email: 'xxxx@example.com',
// 				phone_number: '1234567890'
// 			}
// 		);

// 		console.log(loggedInUser);
// 	} catch (err) {
// 		console.log(err);
// 	}
// }
export async function currentAuthenticatedUser() {
	try {
	  return await Auth.currentAuthenticatedUser({
		bypassCache: false // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
	  });
	} catch(err) {
	  console.log(err);
	}
  };

export async function getCurrentSession() {
	try {
	  return await Auth.currentSession();
	} catch(err) {
	  console.log('Error getting current session: ', err);
	}
  };

export async function updateUserAttributes (user:User, attributes:{[x:string]:any}) {
	try {
		if(Object.keys(attributes).indexOf('email')){
			console.log('a verification code is sent');
		}
		return await Auth.updateUserAttributes(user, attributes);

	} catch(err) {
		console.log(err);
	}
};

/**
 * PWD CHANGE
 */
export async function changePassword(user: User, oldPassword: string, newPassword: string) {
	try {
		return await Auth.changePassword(user, oldPassword, newPassword);
	} catch (err) {
		console.log(err);
	}
}


export async function updateUserEmail(user:User) {
	try {
	  await Auth.updateUserAttributes(user, {
		email: 'updatedEmail@mydomain.com'
	  });
  
	  console.log('a verification code is sent');
	} catch(err) {
	  console.log('failed with error', err);
	}
  }
export async function verifyEmailValidationCode(code: string) {
	try {
	  return await Auth.verifyCurrentUserAttributeSubmit('email', code);
	} catch(err) {
	  console.log('failed with error', err);
	}
  }



  export async function deleteUser() {
	try {
	  return await Auth.deleteUser();
	} catch (error) {
	  console.log('Error deleting user', error);
	}
  }
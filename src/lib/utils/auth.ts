import { redirect } from '@sveltejs/kit';
import { Auth } from 'aws-amplify';

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
		console.log('user', user);
		console.log('userConfirmed', userConfirmed);
		console.log('userSub', userSub);
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
		await Auth.confirmSignUp(username, code, { forceAliasCreation: false });
		console.log('user confirmed');
		throw redirect(301, '/login');
	} catch (error) {
		console.log('error confirming sign up', error);
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
		
		const user = await Auth.signIn(username, password);
		
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
export async function handleLogout() {
    // Call your logout API endpoint here
    // For example, using fetch:
    try {
      const response = await fetch("/logout", {
        method: "POST", // or any other appropriate method
      });

      if (response.ok) {
        // Redirect to the desired page after successful logout
        redirect(303,"/");
      } else {
        // Handle error or show a message
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("An error occurred during logout", error);
    }
  }




/**
 * PWD RESET
 */
async function changePassword(oldPassword: string, newPassword: string) {
	try {
		const user = await Auth.currentAuthenticatedUser();
		const data = await Auth.changePassword(user, oldPassword, newPassword);
		console.log(data);
	} catch (err) {
		console.log(err);
	}
}

/**
 * FORGOTTEN PWD CONFIRM CODE
 */

// Send confirmation code to user's email
async function forgotPassword(username: string) {
	try {
		const data = await Auth.forgotPassword(username);
		console.log(data);
	} catch (err) {
		console.log(err);
	}
}

/**
 * FORGOTTEN PWD CONFIRM CODE SUBMIT
 */
// Collect confirmation code and new password
async function forgotPasswordSubmit(username: string, code: string, newPassword: string) {
	try {
		const data = await Auth.forgotPasswordSubmit(username, code, newPassword);
		console.log(data);
	} catch (err) {
		console.log(err);
	}
}

async function completeNewPassword(username: string, password: string) {
	try {
		const user = await Auth.signIn(username, password);

		if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
			const { requiredAttributes } = user.challengeParam; // the array of required attributes, e.g ['email', 'phone_number']
		}
		const newPassword = 'newPassword';
		const loggedInUser = await Auth.completeNewPassword(
			user, // the Cognito User Object
			newPassword, // the new password
			// OPTIONAL, the required attributes
			{
				email: 'xxxx@example.com',
				phone_number: '1234567890'
			}
		);

		console.log(loggedInUser);
	} catch (err) {
		console.log(err);
	}
}


export async function getCurrentUser() {
    try {
        const user = await Auth.currentAuthenticatedUser({
            bypassCache: false
        });
        return user;
    } catch (error) {
        console.error(error);
    }
};
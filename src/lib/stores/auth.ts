import type { User } from '$lib/types/auth';
import type { Writable } from 'svelte/store';
import { localStorageStore } from '@skeletonlabs/skeleton';
export const user: Writable<User|null> = localStorageStore('user', null);// start with no user
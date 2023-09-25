import type { LayoutServerLoad } from './$types';

// get `locals.user` and pass it to the `page` store
export const load: LayoutServerLoad = async ({parent,locals}) => {
	await parent();	
	if(locals.user){
		return {user:JSON.parse(JSON.stringify(locals.user))}
	}else{
		return {user:undefined}
	}
	
	

}

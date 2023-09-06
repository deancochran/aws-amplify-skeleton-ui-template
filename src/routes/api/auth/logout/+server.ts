import { signOut } from '$lib/utils/auth';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ locals }) => {
    if(locals.user){
        try{
            await signOut()
            return new Response(JSON.stringify("Success"), { status: 200 });
            
        }catch(err){
            return new Response(JSON.stringify(err), { status: 400 });
        }
        
    }else{
        return new Response(JSON.stringify("Failure"), { status: 400 });
    }   
    
};
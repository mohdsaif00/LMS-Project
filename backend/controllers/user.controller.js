import bcrypt from "bcryptjs"
import UserModel from "../models/user.model.js"

export async function register(req, res){
    const{ name, email, number, password} = req.body;

    if(!name || !email || !password || !number){
        return res.status(400).json({
            message: "please enter all details"
        })
    }/* else{res.send('thank you for signup')} */

   /*  const checkuser = await UserModel.findone({number: number});

    if(checkuser){
        return res.status(404).json({
            messsage: "Already Registered, You Need To Login"
        })
    } */

    const hashpassword = await bcrypt.hash(password, 10)

     const newUser = await UserModel.create({
                  name,
                  number,
                  email,
                  password:hashpassword
            })

            res.json(newUser)
}
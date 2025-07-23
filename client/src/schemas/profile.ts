import { z } from "zod";


const profileSchema = z.object({
    name: z.string().min(1, {message: "Name is required"}),
    username: z.string().min(1, {message: "Username is required"}),
    email: z.string().email({message: "Invalid email address"}),
    phone: z.string().min(1, {message: "Phone is required"}).optional(),
    address: z.string().min(1, {message: "Address is required"}).optional(),
    gender: z.string().min(1, {message: "Gender is required"}).optional(),
})

type ProfileSchema = z.infer<typeof profileSchema>;

export { profileSchema, type ProfileSchema };
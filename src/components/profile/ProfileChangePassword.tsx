// import { BackendClientContext } from "@/contexts/BackendClientContext";
// import { Button, Group, Paper, PasswordInput, Text, TextInput, Title } from "@mantine/core";
// import { useForm } from "@mantine/form";
// import { useContext, useState } from "react";

// export default function ProfileChangePassword() {

//     const { user } = useContext(BackendClientContext);
//     const form = useForm({
//         initialValues: {
//             currPassword: "",
//             newPassword: "",
//             newPasswordConfirm: "",
//         }
//     });
//     const [isLoading, setIsLoading] = useState(false);
//     const handleSubmission = (
//         { currPassword, newPassword, newPasswordConfirm }:
//         { currPassword: string, newPassword: string, newPasswordConfirm: string }
//     ) => {
//         console.log(currPassword, newPassword, newPasswordConfirm)
//     };

//     return <Paper className="account-route-modal"
//         withBorder p="md"
//     >
//         <form onSubmit={form.onSubmit(handleSubmission)}>
//             <Title order={3}>Change password</Title>

//             <PasswordInput mt="md"
//                 label="Current password"
//                 required
//                 type="password"
//                 {...form.getInputProps('currPassword')}
//             />

//             <PasswordInput mt="md"
//                 label="New password"
//                 description="Must be between 8 and 72 characters."
//                 required
//                 type="password"
//                 minLength={8}
//                 maxLength={72}
//                 {...form.getInputProps('newPassword')}
//             />

//             <PasswordInput mt="md"
//                 label="New password confirm"
//                 required
//                 type="password"
//                 minLength={8}
//                 maxLength={72}
//                 {...form.getInputProps('newPasswordConfirm')}
//             />

//             <Group
//                 mt="md"
//                 justify="flex-end"
//             >
//                 <Button type="submit"
//                     loading={isLoading}
//                 >
//                     Submit
//                 </Button>
//             </Group>
//         </form>
//     </Paper>
// };

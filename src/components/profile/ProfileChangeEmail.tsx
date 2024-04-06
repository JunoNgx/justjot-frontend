import { Button, Group, Paper, PasswordInput, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";

export default function ProfileChangeEmail() {

    const form = useForm({
        initialValues: {
            newEmail: "",
            password: "",
        }
    });
    const [isLoading, setIsLoading] = useState(false);
    const handleSubmission = (
        { newEmail, password }:
        { password: string, newEmail: string }
    ) => {
        console.log(newEmail, password)
    };

    return <Paper className="account-route-modal"
        withBorder p="md"
    >
        <form onSubmit={form.onSubmit(handleSubmission)}>
            <Title order={3}>Change email</Title>

            <TextInput mt="md"
                label="New email"
                description="Must be unique."
                required
                type="email"
                {...form.getInputProps('newEmail')}
            />

            <PasswordInput mt="md"
                label="Password confirmation"
                description="Enter your existing password as verification"
                required
                placeholder="IronMaus123"
                type="password"
                minLength={8}
                maxLength={72}
                {...form.getInputProps('password')}
            />

            <Group
                mt="md"
                justify="flex-end"
            >
                <Button type="submit"
                    loading={isLoading}
                >
                    Submit
                </Button>
            </Group>
        </form>
    </Paper>
}
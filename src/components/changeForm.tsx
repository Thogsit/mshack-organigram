"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"

const FormSchema = z.object({
  organisationName: z.string().min(2, {
    message: "Der Name der Organisation darf nicht leer sein.",
  }),
})

export function EditNodeForm({
  eventTarget,
  openDialog,
  setOpenDialog,
}: {
  eventTarget: EventTarget | null;
  openDialog: boolean;
  setOpenDialog: (open: boolean) => void;
}) {
  
  const form = useForm<z.infer<typeof FormSchema>>({
      resolver: zodResolver(FormSchema),
      defaultValues: {
      organisationName: "",
      },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data)
  }

    return (
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your account
              and remove your data from our servers.
            </DialogDescription>
            {eventTarget && (
              <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
                <FormField
                  control={form.control}
                  name="organisationName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name der Organisation: </FormLabel>
                      <FormControl>
                        <Input defaultValue={eventTarget.id} type="text" placeholder="Organisation A1" {...field} />
                      </FormControl>
                      <FormDescription>
                        ba ba
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Submit</Button>
              </form>
            </Form>
            )}
          </DialogHeader>
        </DialogContent>
      </Dialog>
    ) 
}

'use client'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { TourCreate, initTourCreate } from '@/types/ITour'
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { useForm } from 'react-hook-form'

import { toast } from '@/components/ui/use-toast'

import * as z from 'zod'
import { CalendarIcon } from 'lucide-react'

const Page = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      ),
    })
  }

  return (
    <Card>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <CardHeader>
          <CardTitle>Form TOUR</CardTitle>
          <CardDescription>thêm tour mới</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <div className="grid grid-cols-2 gap-4 mb-3">
              {Object.keys(initTourCreate).map((x) => {
                const key = x as keyof TourCreate

                return (
                  <FormField
                    key={key}
                    control={form.control}
                    name={key}
                    render={({ field }) => {
                      const valueString = field.value?.toString() ?? ''
                      let component = (
                        <FormControl>
                          <Input
                            placeholder={key}
                            {...field}
                            value={valueString}
                          />
                        </FormControl>
                      )

                      if (
                        field.name === 'goDate' ||
                        field.name === 'visaDate' ||
                        field.name === 'returnDate'
                      ) {
                        component = (
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={'outline'}
                                  className={cn(
                                    'w-[240px] pl-3 text-left font-normal',
                                    !field.value && 'text-muted-foreground',
                                  )}
                                >
                                  {field.value ? (
                                    format(new Date(field.value), 'dd/MM/yyyy')
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto p-0"
                              align="start"
                            >
                              <Calendar
                                mode="single"
                                selected={new Date(field.value)}
                                onSelect={field.onChange}
                              />
                            </PopoverContent>
                          </Popover>
                        )
                      }

                      if (field.name === 'commision') {
                        return <></>
                      }

                      if (
                        field.name === 'tourMan' ||
                        field.name === 'tourGuide'
                      ) {
                        return <></>
                      }

                      return (
                        <FormItem className="flex flex-col">
                          <FormLabel>{key}</FormLabel>
                          {component}
                          <FormMessage />
                        </FormItem>
                      )
                    }}
                  />
                )
              })}

              <FormField
                control={form.control}
                name="tourMan"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a verified email to display" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="m@example.com">
                          m@example.com
                        </SelectItem>
                        <SelectItem value="m@google.com">
                          m@google.com
                        </SelectItem>
                        <SelectItem value="m@support.com">
                          m@support.com
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </Form>

          <Button type="submit">Lưu lại</Button>
        </CardContent>
      </form>
      <CardFooter></CardFooter>
    </Card>
  )
}

const formSchema = z.object({
  route: z.string({ required_error: 'không được bỏ trống phần này' }),
  duration: z.string(),
  name: z.string(),
  transport: z.string(),
  goFlight: z.string(),
  returnFlight: z.string(),
  hotelClass: z.number(),
  programLink: z.string(),
  commision: z.number(),
  status: z.string(),
  tourMan: z.string(),
  tourGuide: z.string(),
  operator: z.string(),
  goDate: z.date(),
  returnDate: z.date(),
  visaDate: z.date({ required_error: 'khong duoc bo trong' }),
})

export default Page

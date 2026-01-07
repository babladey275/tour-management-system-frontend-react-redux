/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { cn } from "@/lib/utils";
import {
  useSendOtpMutation,
  useVerifyOtpMutation,
} from "@/redux/features/auth/auth.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dot } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router";
import { toast } from "sonner";
import z from "zod";

const OTP_EXPIRE_SECONDS = 120;

const FormSchema = z.object({
  pin: z.string().length(6, "OTP must be 6 digits"),
});

const formatTime = (seconds: number) => {
  const min = Math.floor(seconds / 60);
  const sec = seconds % 60;
  return `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
};

export default function Verify() {
  const location = useLocation();
  const navigate = useNavigate();

  const email = useMemo(() => {
    return (location.state as string | undefined) ?? "";
  }, [location.state]);

  const [otpSent, setOtpSent] = useState(false);
  const [timer, setTimer] = useState(0);

  const otpExpired = otpSent && timer === 0;

  // const expiredToastShownRef = useRef(false);

  const [sendOtp] = useSendOtpMutation();
  const [verifyOtp] = useVerifyOtpMutation();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { pin: "" },
  });

  //! Needed - Turned off for development
  useEffect(() => {
    if (!email) {
      navigate("/");
    }
  }, [email, navigate]);

  // countdown
  useEffect(() => {
    if (!otpSent) return;
    if (timer <= 0) return;

    const timerId = setInterval(() => {
      setTimer((prev) => prev - 1);
      // console.log("Tick");
    }, 1000);

    return () => clearInterval(timerId);
  }, [otpSent, timer]);

  // show toast once when expired
  // useEffect(() => {
  //   if (!otpSent) return;

  //   if (timer === 0 && !expiredToastShownRef.current) {
  //     expiredToastShownRef.current = true;
  //     toast.error("OTP expired. Please resend OTP.");
  //   }

  //   // reset the "shown" flag whenever timer is reset above 0
  //   if (timer > 0) {
  //     expiredToastShownRef.current = false;
  //   }
  // }, [otpSent, timer]);

  const handleSendOtp = async () => {
    if (!email) {
      toast.error("Email not found");
      return;
    }

    const toastId = toast.loading("Sending OTP...");

    try {
      const res = await sendOtp({ email }).unwrap();

      if (res?.success) {
        toast.success("OTP Sent", { id: toastId });
        setOtpSent(true);
        setTimer(OTP_EXPIRE_SECONDS);
        form.reset({ pin: "" });
      } else {
        toast.error("Failed to send OTP", { id: toastId });
      }
    } catch (err: any) {
      toast.error(err?.data?.message ?? "Failed to send OTP", { id: toastId });
    }
  };

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    if (otpExpired) {
      toast.error("OTP expired. Please resend OTP.");
      return;
    }

    const toastId = toast.loading("Verifying OTP...");

    try {
      const res = await verifyOtp({ email, otp: data.pin }).unwrap();

      if (res?.success) {
        toast.success("OTP Verified", { id: toastId });
        navigate("/");
      } else {
        toast.error("Invalid OTP", { id: toastId });
      }
    } catch (err: any) {
      toast.error(err?.data?.message ?? "OTP verification failed", {
        id: toastId,
      });
    }
  };

  return (
    <div className="grid place-content-center h-screen">
      {otpSent ? (
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Verify your email address</CardTitle>
            <CardDescription>
              Please enter the 6-digit code sent to <br /> {email}
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Form {...form}>
              <form
                id="otp-form"
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="pin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>One-Time Password</FormLabel>
                      <FormControl>
                        <InputOTP
                          maxLength={6}
                          {...field}
                          disabled={otpExpired}
                        >
                          {[0, 1, 2].map((i) => (
                            <InputOTPGroup key={i}>
                              <InputOTPSlot index={i} />
                            </InputOTPGroup>
                          ))}
                          <Dot />
                          {[3, 4, 5].map((i) => (
                            <InputOTPGroup key={i}>
                              <InputOTPSlot index={i} />
                            </InputOTPGroup>
                          ))}
                        </InputOTP>
                      </FormControl>

                      <FormDescription className="flex items-center gap-2">
                        <Button
                          type="button"
                          variant="link"
                          onClick={handleSendOtp}
                          disabled={timer !== 0}
                          className={cn("p-0 m-0", {
                            "cursor-pointer": timer === 0,
                            "text-gray-500": timer !== 0,
                          })}
                        >
                          Resend OTP:
                        </Button>

                        <span
                          className={cn({
                            "text-red-600": otpExpired || timer <= 10,
                          })}
                        >
                          {/* {otpExpired ? "Expired" : formatTime(timer)} */}
                          {formatTime(timer)}
                        </span>
                      </FormDescription>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </CardContent>

          <CardFooter className="flex justify-end">
            <Button form="otp-form" type="submit" disabled={otpExpired}>
              Submit
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Verify your email address</CardTitle>
            <CardDescription>
              We will send an OTP to <br /> {email}
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-end">
            <Button onClick={handleSendOtp} className="w-75">
              Confirm
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}

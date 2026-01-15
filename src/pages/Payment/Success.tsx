import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2, Copy, ReceiptText, ArrowLeft } from "lucide-react";
import { useLocation, useNavigate } from "react-router";

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

function fmtMoney(amount?: string, currency?: string) {
  if (!amount) return "—";
  const n = Number(amount);
  if (Number.isNaN(n)) return `${amount}${currency ? ` ${currency}` : ""}`;
  return `${n.toFixed(2)}${currency ? ` ${currency}` : ""}`;
}

export default function Success() {
  const q = useQuery();
  const navigate = useNavigate();

  const tranId = q.get("transactionId") || "";
  const amount = q.get("amount") || "";
  const currency = q.get("currency") || "BDT";
  const status = q.get("status") || "SUCCESS";

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // ignore
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] w-full flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl">
        <div className="pointer-events-none absolute -top-10 -left-10 h-40 w-40 rounded-full bg-emerald-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-cyan-500/20 blur-3xl" />

        <Card className="overflow-hidden rounded-2xl shadow-lg">
          <div className="bg-linear-to-r from-emerald-600 via-emerald-500 to-cyan-600 p-6 text-white">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-white/15 p-3">
                <CheckCircle2 className="h-7 w-7" />
              </div>
              <div className="flex-1">
                <CardTitle className="text-2xl font-semibold">
                  Payment Successful 🎉
                </CardTitle>
                <p className="text-white/90 mt-1">
                  Your payment was completed. We’ve received your order.
                </p>
              </div>
              <Badge className="bg-white/15 text-white hover:bg-white/20 border-white/20">
                {status}
              </Badge>
            </div>
          </div>

          <CardHeader className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <ReceiptText className="h-4 w-4" />
              <span>Transaction summary</span>
            </div>
          </CardHeader>

          <CardContent className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-xl border p-4">
                <p className="text-xs text-muted-foreground">Amount</p>
                <p className="mt-1 text-lg font-semibold">
                  {fmtMoney(amount, currency)}
                </p>
              </div>

              <div className="rounded-xl border p-4">
                <p className="text-xs text-muted-foreground">Transaction ID</p>
                <div className="mt-1 flex items-center justify-between gap-2">
                  <p className="text-lg font-semibold truncate">
                    {tranId || "—"}
                  </p>
                  <Button
                    variant="outline"
                    size="icon"
                    className="shrink-0"
                    onClick={() => tranId && copy(tranId)}
                    disabled={!tranId}
                    aria-label="Copy transaction id"
                    title="Copy"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <Separator />

            <div className="rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200/60 dark:border-emerald-900 p-4">
              <p className="font-medium">What happens next?</p>
              <ul className="mt-2 list-disc pl-5 text-sm text-muted-foreground space-y-1">
                <li>We’ll start processing your booking immediately.</li>
                <li>
                  Your booking is confirmed and the invoice has been sent to
                  your email.
                </li>
                <li>Please keep the Transaction ID for reference.</li>
              </ul>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
            <Button
              variant="ghost"
              className="w-full sm:w-auto"
              onClick={() => navigate("/")}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>

            {/* <div className="flex w-full sm:w-auto gap-3">
              <Button
                className="flex-1 sm:flex-none"
                onClick={() => navigate("/orders")}
              >
                <PackageOpen className="mr-2 h-4 w-4" />
                Go to Booking
              </Button>
            </div> */}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

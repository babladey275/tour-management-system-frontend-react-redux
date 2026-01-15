import React from "react";
import { useLocation, useNavigate } from "react-router";
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
import { XCircle, AlertTriangle, Copy, ArrowLeft } from "lucide-react";

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

export default function Fail() {
  const q = useQuery();
  const navigate = useNavigate();

  const tranId = q.get("transactionId") || "";
  const status = q.get("status");
  const reason = q.get("message") || "";

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
        <div className="pointer-events-none absolute -top-10 -left-10 h-40 w-40 rounded-full bg-rose-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-orange-500/20 blur-3xl" />

        <Card className="overflow-hidden rounded-2xl shadow-lg">
          <div className="bg-linear-to-r from-rose-600 via-rose-500 to-orange-600 p-6 text-white">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-white/15 p-3">
                <XCircle className="h-7 w-7" />
              </div>
              <div className="flex-1">
                <CardTitle className="text-2xl font-semibold">
                  Payment Failed
                </CardTitle>
                <p className="text-white/90 mt-1">
                  Don’t worry—no money should be captured if the transaction
                  failed.
                </p>
              </div>
              <Badge className="bg-white/15 text-white hover:bg-white/20 border-white/20">
                {status}
              </Badge>
            </div>
          </div>

          <CardHeader className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <AlertTriangle className="h-4 w-4" />
              <span>Failure details</span>
            </div>
          </CardHeader>

          <CardContent className="space-y-5">
            <div className="rounded-xl border p-4">
              <p className="text-xs text-muted-foreground">
                Reason (if provided)
              </p>
              <p className="mt-1 font-medium">
                {reason || "No reason received from gateway."}
              </p>
            </div>

            <div className="gap-4">
              <div className="rounded-xl border p-4">
                <p className="text-xs text-muted-foreground">Transaction ID</p>
                <div className="mt-1 flex items-center justify-between gap-2">
                  <p className="font-semibold truncate">{tranId || "—"}</p>
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

            <div className="rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200/60 dark:border-rose-900 p-4">
              <p className="font-medium">Quick fixes you can try</p>
              <ul className="mt-2 list-disc pl-5 text-sm text-muted-foreground space-y-1">
                <li>Retry with a stable internet connection.</li>
                <li>Use another payment method (card / mobile banking).</li>
                <li>Check your bank app for any pending charge.</li>
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
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

"use client";

import { PropsWithChildren } from "react";
import { queryClient } from "@/utils/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { RadixProvider } from "../radix/providers/RadixProvider";
import { ReduxProvider } from "../redux/provider";

function Providers({ children }: PropsWithChildren) {

  return (
    <ReduxProvider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <RadixProvider>
          {children}
        </RadixProvider>
      </QueryClientProvider>
    </ReduxProvider>
  );
}

export default Providers;




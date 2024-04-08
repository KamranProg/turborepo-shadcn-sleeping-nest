import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@repo/ui/components/ui/alert";
import { AlertCircle } from "@repo/ui/components/ui/icons";

export interface BasicAlertsProps {
  title?: string;
  messages: string[];
  variant?: "default" | "destructive";
}

export function BasicAlerts({
  title = "Submit Errors",
  messages,
  variant = "destructive",
}: BasicAlertsProps) {
  return (
    <Alert variant={variant}>
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>
        <ul>
        {messages.map((str) => (
          <li key={str} className="p-1">
            {str}
          </li>
        ))}
        </ul>
      </AlertDescription>
    </Alert>
  );
}

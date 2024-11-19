export const detectKeylogger = (data: any) => {
  const { appName, permissions, activityLogs, networkRequests } = data;

  let isSuspicious = false;
  const reasons = [];

  const sensitivePermissions = [
    "keyboard_access",
    "accessibility",
    "clipboard_access",
  ];
  const hasSensitivePermissions = permissions.some((perm: any) =>
    sensitivePermissions.includes(perm)
  );
  if (hasSensitivePermissions) {
    isSuspicious = true;
    reasons.push(
      `${appName} requests sensitive permissions: ${permissions
        .filter((perm: any) => sensitivePermissions.includes(perm))
        .join(", ")}`
    );
  }

  const keystrokeCount = activityLogs.filter(
    (log: any) => log.event === "keystroke"
  ).length;
  if (keystrokeCount > 500) {
    isSuspicious = true;
    reasons.push(
      `Excessive keystroke logging detected (${keystrokeCount} logs).`
    );
  }

  const continuousMonitoring = activityLogs.some(
    (log: any) => log.event === "background_monitoring"
  );
  if (continuousMonitoring) {
    isSuspicious = true;
    reasons.push("App is monitoring user activity in the background.");
  }

  const suspiciousNetworkRequests = networkRequests.filter((req: any) => {
    return req.endpoint.includes("upload") || req.endpoint.includes("log");
  }).length;
  if (suspiciousNetworkRequests > 0) {
    isSuspicious = true;
    reasons.push(
      `${suspiciousNetworkRequests} suspicious network requests detected (e.g., uploading logs).`
    );
  }

  return { isSuspicious, reasons };
};

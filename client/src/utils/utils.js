export function formatDuration(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds - hours * 60) / 60);
  return (
    (hours !== 0 ? `${hours}` : "") +
    `${minutes === 0 ? "0" : minutes}:${
      Math.floor(seconds - hours * 60 - minutes * 60) < 10
        ? `0${Math.floor(seconds - hours * 60 - minutes * 60)}`
        : Math.floor(seconds - hours * 60 - minutes * 60)
    }`
  );
}

export function formatTime() {
  const today = new Date();
  return today.toLocaleString("en-US", {
    hour: "numeric",
    hour12: true,
    minute: "2-digit",
  });
}

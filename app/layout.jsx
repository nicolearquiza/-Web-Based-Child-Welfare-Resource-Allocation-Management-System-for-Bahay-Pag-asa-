import './globals.css';

export const metadata = {
  title: 'Bahay Pag-asa | Child Welfare Resource Allocation',
  description: 'Child Welfare and Resource Allocation Management System',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

import type { CheckoutData } from '@/data/types';
import { governorates } from '@/data/site';
export function validateCheckout(
  data: CheckoutData,
): Partial<Record<keyof CheckoutData, string>> {
  const errors: Partial<Record<keyof CheckoutData, string>> = {};
  if (data.fullName.trim().length < 3)
    errors.fullName = 'Enter your full name.';
  if (
    !/^(?:\+962|00962|0)7[789]\d{7}$/.test(data.phone.replace(/[\s()-]/g, ''))
  )
    errors.phone = 'Enter a Jordan mobile number, e.g. 07X XXX XXXX.';
  if (!governorates.includes(data.governorate))
    errors.governorate = 'Choose your governorate.';
  if (data.area.trim().length < 2)
    errors.area = 'Enter your area or neighborhood.';
  if (data.address.trim().length < 8)
    errors.address = 'Enter your street, building and apartment details.';
  return errors;
}
// Frontend-only boundary. Replace with the real checkout service later.
// Does not send, log, store customer details, or create an order.
export async function submitDemoCheckout(
  data: CheckoutData,
): Promise<{ demo: true; number: string }> {
  if (Object.keys(validateCheckout(data)).length)
    throw new Error('Please check your details.');
  await new Promise((resolve) => setTimeout(resolve, 650));
  return { demo: true, number: 'BLK-1042' };
}

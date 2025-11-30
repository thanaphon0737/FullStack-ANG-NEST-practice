export interface Customer {
  id: number;
  first_name: string;
  last_name: string;
  segment: string;
  has_secret: boolean;      // มาจาก CASE WHEN ใน SQL
  last_accessed_at: string | null; // มาจาก Subquery (อาจเป็น null ได้)
  
  // Field พิเศษที่เราจะเอาไว้ใช้ใน Frontend เท่านั้น (ไม่ได้มาจาก DB)
  revealed_id?: string;     // เก็บเลขบัตรที่ถอดรหัสแล้ว
  isLoadingSecret?: boolean; // หมุนติ้วๆ ตอนกดดู
}
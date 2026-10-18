import { redirect } from "next/navigation";

/** 打开即进入工作台：默认落到 01 爆款雷达 */
export default function Home() {
  redirect("/radar");
}

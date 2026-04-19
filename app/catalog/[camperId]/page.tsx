import { Metadata } from "next";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { fetchCamperById, fetchCamperReviews } from "@/lib/api/clientApi";
import CamperDetailsClient from "./CamperDetails.client";

type CamperDetailsProps = {
  params: Promise<{ camperId: string }>;
};

export async function generateMetadata({
  params,
}: CamperDetailsProps): Promise<Metadata> {
  const { camperId } = await params;

  const camper = await fetchCamperById(camperId);

  return {
    title: `Camper: ${camper.name}`,
    description: `${camper.description?.slice(0, 32)}...`,
    openGraph: {
      title: `Note: ${camper.name}`,
      description: `${camper.description?.slice(0, 96)}...`,
      url: `/campers/${camperId}`, // !!!
      siteName: "TravelTrucks",
      images: [
        {
          url: "/home.jpg", // !!!
          width: 1200,
          height: 630,
          alt: "Notehub",
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `Camper: ${camper.name}`,
      description: `${camper.description?.slice(0, 16)}...`,
      images: ["/home.jpg"], // !!!
    },
  };
}

const CamperDetails = async ({ params }: CamperDetailsProps) => {
  const { camperId } = await params;
  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ["camper", camperId],
      queryFn: () => fetchCamperById(camperId),
    }),
    queryClient.prefetchQuery({
      queryKey: ["reviews", camperId],
      queryFn: () => fetchCamperReviews(camperId),
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CamperDetailsClient />
    </HydrationBoundary>
  );
};

export default CamperDetails;

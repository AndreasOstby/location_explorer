import Image from "next/image";

import { CommentSection } from "~/app/_components/CommentSection";
import RecommendationItem from "~/app/_components/RecommendationItem";
import { getServerAuthSession } from "~/server/auth";
import { db } from "~/server/db";
import { Maps } from "../../_components/Maps";
import Tag from "../../_components/Tag";
import { Suspense } from "react";
import { Line } from "../../_components/Line";

export default async function Home({ params }: { params: { id: string } }) {
  // const hello = await api.post.hello.query({ text: "from tRPC" });

  // get the location from the database
  // TODO: account for private locations
  const location = await db.query.locations.findFirst({
    where: (location, { eq }) => eq(location.id, Number(params.id)),
    with: {
      images: true,
      // reviews: {
      //   where: (),
      // },
    },
  });

  // await db.insert(locations).values({

  //   name: "Bislett stadion",
  //   lat: 59.9255950220818,
  //   lng: 10.73426445859592,
  //   description: "Perfect place for running",
  //   rating: 1,
  //   createdById: "asd",

  //   // recommendations
  //   public_transport_accessibility: 1,
  //   parking_accessibility: 2,
  //   cost: 0,
  //   difficulty: "medium",
  //   recommended_in_the_summer: true,
  //   recommended_in_the_winter: false,
  //   recommended_in_the_spring: true,
  //   recommended_in_the_fall: true,

  // })

  // const session = await getServerAuthSession();

  if (!location) {
    return (
      <div>
        <span>Location not found: </span>
        <span>{params.id}</span>
      </div>
    );
  }

  return (
    <div className="flex justify-center">
      <main className=" w-full max-w-[1200px] px-6">
        <ImageShowcase />
        <div className="flex flex-row justify-between gap-4 pt-6 ">
          <div className="flex-2 mr-20 flex w-full flex-col gap-6">
            <div className="flex flex-row items-center justify-between">
              <Title
                text={location.name!}
                rating={location.rating!.toFixed(1)}
              />
              <ActionButtons />
            </div>
            <div className="flex h-full flex-col gap-8">
              <div className="flex w-full flex-col gap-2">
                <span className="text-lg font-bold">Recommendations</span>
                <div className="flex h-full flex-wrap gap-x-20 p-4">
                  <RecommendationItem
                    text="Public transport accessible"
                    icon={
                      <svg
                        width="24"
                        height="25"
                        viewBox="0 0 24 25"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle
                          cx="18"
                          cy="7.27612"
                          r="1"
                          stroke="#33363F"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                        <path
                          d="M4.03652 17.7761H14.9635C15.6107 17.7761 15.99 17.0476 15.6189 16.5174L10.1554 8.71239C9.8369 8.25741 9.16309 8.25742 8.84461 8.71239L3.38114 16.5174C3.00998 17.0476 3.38931 17.7761 4.03652 17.7761Z"
                          stroke="#33363F"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                        <path
                          d="M10.5 17.7761H19.0566C19.685 17.7761 20.068 17.085 19.735 16.5521L16.1784 10.8616C15.8651 10.3602 15.1349 10.3602 14.8216 10.8616L13.3616 13.1976"
                          stroke="#33363F"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    }
                  />
                  <RecommendationItem
                    text="Public transport accessible"
                    icon={
                      <svg
                        width="24"
                        height="25"
                        viewBox="0 0 24 25"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle
                          cx="18"
                          cy="7.27612"
                          r="1"
                          stroke="#33363F"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                        <path
                          d="M4.03652 17.7761H14.9635C15.6107 17.7761 15.99 17.0476 15.6189 16.5174L10.1554 8.71239C9.8369 8.25741 9.16309 8.25742 8.84461 8.71239L3.38114 16.5174C3.00998 17.0476 3.38931 17.7761 4.03652 17.7761Z"
                          stroke="#33363F"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                        <path
                          d="M10.5 17.7761H19.0566C19.685 17.7761 20.068 17.085 19.735 16.5521L16.1784 10.8616C15.8651 10.3602 15.1349 10.3602 14.8216 10.8616L13.3616 13.1976"
                          stroke="#33363F"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    }
                  />
                  <RecommendationItem
                    text="Public transport accessible"
                    icon={
                      <svg
                        width="24"
                        height="25"
                        viewBox="0 0 24 25"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle
                          cx="18"
                          cy="7.27612"
                          r="1"
                          stroke="#33363F"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                        <path
                          d="M4.03652 17.7761H14.9635C15.6107 17.7761 15.99 17.0476 15.6189 16.5174L10.1554 8.71239C9.8369 8.25741 9.16309 8.25742 8.84461 8.71239L3.38114 16.5174C3.00998 17.0476 3.38931 17.7761 4.03652 17.7761Z"
                          stroke="#33363F"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                        <path
                          d="M10.5 17.7761H19.0566C19.685 17.7761 20.068 17.085 19.735 16.5521L16.1784 10.8616C15.8651 10.3602 15.1349 10.3602 14.8216 10.8616L13.3616 13.1976"
                          stroke="#33363F"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    }
                  />
                  <RecommendationItem
                    text="Public transport accessible"
                    icon={
                      <svg
                        width="24"
                        height="25"
                        viewBox="0 0 24 25"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle
                          cx="18"
                          cy="7.27612"
                          r="1"
                          stroke="#33363F"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                        <path
                          d="M4.03652 17.7761H14.9635C15.6107 17.7761 15.99 17.0476 15.6189 16.5174L10.1554 8.71239C9.8369 8.25741 9.16309 8.25742 8.84461 8.71239L3.38114 16.5174C3.00998 17.0476 3.38931 17.7761 4.03652 17.7761Z"
                          stroke="#33363F"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                        <path
                          d="M10.5 17.7761H19.0566C19.685 17.7761 20.068 17.085 19.735 16.5521L16.1784 10.8616C15.8651 10.3602 15.1349 10.3602 14.8216 10.8616L13.3616 13.1976"
                          stroke="#33363F"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    }
                  />
                </div>
              </div>
            </div>

            <Line />
          </div>
          <div className="card flex h-[400px] w-4/12 shrink-0 flex-col items-end bg-slate-400">
            <span className="text-xs">400 meters away</span>
            <span className="text-lg">Nesodden, Oslo 0168</span>

            <Maps lat={location.lat!} lng={location.lng!}></Maps>
          </div>
        </div>
        <div className="flex flex-row justify-between gap-4 pt-6">
          <div className="flex-2 mr-20 flex h-full w-full flex-col items-center gap-6">
            <Dot />
            <div className="flex w-full justify-center px-10">
              <span className="text-sm">{location.description!}</span>
            </div>
          </div>
          <div className="card flex w-4/12 shrink-0 flex-col gap-2 bg-slate-400">
            <span className="text-lg font-semibold text-secondaryBlack">
              Tags
            </span>
            <Line />
          </div>
        </div>

        <div>
          <Suspense fallback={<div>Loading.asdas..</div>}>
            <CommentSection location_id={params.id}></CommentSection>
          </Suspense>
        </div>
      </main>
    </div>
  );
}

function Dot() {
  return <div className="h-[3px] w-[3px] rounded-full bg-lightGray"></div>;
}

function ActionButtons() {
  return (
    <div className="flex items-center gap-4">
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10.1437 6.62753C10.9303 4.66653 11.3236 3.68604 12 3.68604C12.6763 3.68604 13.0696 4.66653 13.8562 6.62753L13.8928 6.71885C14.3372 7.82672 14.5594 8.38065 15.0123 8.71734C15.4651 9.05403 16.0596 9.10727 17.2485 9.21374L17.4634 9.23299C19.4092 9.40726 20.3822 9.49439 20.5903 10.1134C20.7985 10.7324 20.076 11.3897 18.6309 12.7044L18.1487 13.1432C17.4172 13.8087 17.0514 14.1414 16.8809 14.5776C16.8491 14.6589 16.8227 14.7423 16.8018 14.8271C16.6897 15.2817 16.7968 15.7645 17.0111 16.7299L17.0777 17.0305C17.4714 18.8048 17.6682 19.692 17.3246 20.0746C17.1961 20.2176 17.0292 20.3206 16.8438 20.3712C16.3476 20.5066 15.6431 19.9325 14.2342 18.7844C13.309 18.0305 12.8464 17.6536 12.3153 17.5688C12.1064 17.5354 11.8935 17.5354 11.6846 17.5688C11.1535 17.6536 10.6909 18.0305 9.76577 18.7844C8.35681 19.9325 7.65234 20.5066 7.15614 20.3712C6.97072 20.3206 6.80381 20.2176 6.67538 20.0746C6.33171 19.692 6.52854 18.8048 6.92222 17.0305L6.98889 16.7299C7.2031 15.7645 7.31021 15.2817 7.19815 14.8271C7.17725 14.7423 7.15081 14.6589 7.11901 14.5776C6.94854 14.1414 6.58279 13.8087 5.85128 13.1432L5.369 12.7044C3.92395 11.3897 3.20143 10.7324 3.40961 10.1134C3.61779 9.49439 4.5907 9.40726 6.53651 9.23299L6.75145 9.21374C7.94036 9.10727 8.53482 9.05403 8.98767 8.71734C9.44052 8.38065 9.66272 7.82672 10.1071 6.71885L10.1437 6.62753Z"
          stroke="#33363F"
          strokeWidth="2"
        />
      </svg>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4.45067 13.9082L11.4033 20.4395C11.6428 20.6644 11.7625 20.7769 11.9037 20.8046C11.9673 20.8171 12.0327 20.8171 12.0963 20.8046C12.2375 20.7769 12.3572 20.6644 12.5967 20.4395L19.5493 13.9082C21.5055 12.0706 21.743 9.0466 20.0978 6.92607L19.7885 6.52734C17.8203 3.99058 13.8696 4.41601 12.4867 7.31365C12.2913 7.72296 11.7087 7.72296 11.5133 7.31365C10.1304 4.41601 6.17972 3.99058 4.21154 6.52735L3.90219 6.92607C2.25695 9.0466 2.4945 12.0706 4.45067 13.9082Z"
          stroke="#33363F"
          strokeWidth="2"
        />
      </svg>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4 9C4 6.17157 4 4.75736 4.87868 3.87868C5.75736 3 7.17157 3 10 3H14C16.8284 3 18.2426 3 19.1213 3.87868C20 4.75736 20 6.17157 20 9V15.8276C20 18.5109 20 19.8525 19.1557 20.2629C18.3114 20.6733 17.2565 19.8444 15.1465 18.1866L14.4713 17.656C13.2849 16.7239 12.6917 16.2578 12 16.2578C11.3083 16.2578 10.7151 16.7239 9.52871 17.656L8.85346 18.1866C6.74355 19.8444 5.68859 20.6733 4.84429 20.2629C4 19.8525 4 18.5109 4 15.8276V9Z"
          stroke="#33363F"
          strokeWidth="2"
        />
      </svg>
    </div>
  );
}

function Title({ text, rating }: { text: string; rating: string }) {
  return (
    <div className="flex items-center gap-6">
      <span className="text-4xl font-bold">{text}</span>
      <div className="justify-baseline flex items-baseline gap-1">
        <span className="text-md">{rating}</span>
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.60777 5.47077C8.19773 4.00002 8.4927 3.26465 8.99995 3.26465C9.50719 3.26465 9.80217 4.00002 10.3921 5.47077L10.4196 5.53926C10.7529 6.37016 10.9195 6.78561 11.2592 7.03813C11.5988 7.29064 12.0447 7.33057 12.9363 7.41043L13.0975 7.42487C14.5569 7.55556 15.2866 7.62091 15.4427 8.08515C15.5989 8.54939 15.057 9.0424 13.9732 10.0284L13.6115 10.3575C13.0628 10.8566 12.7885 11.1062 12.6607 11.4333C12.6368 11.4943 12.617 11.5568 12.6013 11.6204C12.5173 11.9614 12.5976 12.3235 12.7583 13.0476L12.8083 13.273C13.1035 14.6037 13.2511 15.2691 12.9934 15.5561C12.8971 15.6633 12.7719 15.7406 12.6328 15.7785C12.2607 15.88 11.7323 15.4495 10.6756 14.5884C9.98172 14.023 9.63478 13.7403 9.23646 13.6767C9.07978 13.6517 8.92012 13.6517 8.76344 13.6767C8.36511 13.7403 8.01817 14.023 7.32429 14.5884C6.26758 15.4495 5.73922 15.88 5.36707 15.7785C5.22801 15.7406 5.10283 15.6633 5.00651 15.5561C4.74875 15.2691 4.89638 14.6037 5.19163 13.273L5.24164 13.0476C5.4023 12.3235 5.48262 11.9614 5.39858 11.6204C5.38291 11.5568 5.36308 11.4943 5.33923 11.4333C5.21137 11.1062 4.93706 10.8566 4.38843 10.3575L4.02672 10.0284C2.94293 9.0424 2.40104 8.54939 2.55718 8.08515C2.71331 7.62091 3.44299 7.55556 4.90235 7.42487L5.06355 7.41043C5.95524 7.33057 6.40109 7.29064 6.74072 7.03813C7.08036 6.78561 7.24701 6.37016 7.5803 5.53926L7.60777 5.47077Z"
            fill="black"
            stroke="black"
            strokeWidth="2"
          />
        </svg>
      </div>
      <Tag
        text="Summer"
        icon={
          <svg
            width="17"
            height="17"
            viewBox="0 0 17 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="8.49996"
              cy="8.50008"
              r="1.83333"
              stroke="#33363F"
              strokeWidth="2"
            />
            <path
              d="M8.5 3.54167V2.125"
              stroke="#33363F"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M8.5 14.8749V13.4583"
              stroke="#33363F"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M12.0061 4.99392L13.0078 3.99219"
              stroke="#33363F"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M3.99216 13.0078L4.9939 12.0061"
              stroke="#33363F"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M13.4583 8.5L14.875 8.5"
              stroke="#33363F"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M2.12496 8.5L3.54163 8.5"
              stroke="#33363F"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M12.0061 12.0061L13.0078 13.0078"
              stroke="#33363F"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M3.99216 3.99216L4.9939 4.9939"
              stroke="#33363F"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        }
      ></Tag>
    </div>
  );
}

async function ImageShowcase() {
  const session = await getServerAuthSession();
  // if (!session?.user) return null;

  return (
    <div className="flex h-[50vh] flex-row gap-2">
      <Image
        src={"/images/mountains-862870_1920.jpg"}
        alt=""
        width={1920}
        height={1080}
        className="h-full w-1/2 object-cover"
      ></Image>
      <div className="flex h-full w-1/2 flex-row items-center justify-center gap-2">
        <div className="flex h-full flex-1 flex-col gap-2">
          <Image
            src={"/images/mountains-1048995_1920.jpg"}
            alt=""
            width={1920}
            height={1080}
            className="h-[calc(50%-0.25rem)] object-cover"
          ></Image>
          <Image
            src={"/images/mountains-1048995_1920.jpg"}
            alt=""
            width={1920}
            height={1080}
            className="h-[calc(50%-0.25rem)] object-cover"
          ></Image>
        </div>
        <div className="flex h-full w-[25vh] shrink-0 flex-col gap-2">
          <Image
            src={"/images/mountains-1048995_1920.jpg"}
            alt=""
            width={1920}
            height={1080}
            className="h-full w-full flex-1 object-cover"
          ></Image>
          <div className="relative flex h-full w-full flex-1 items-center justify-center overflow-hidden bg-[#E7E7E7] object-cover">
            {/* <Image src={"/images/mountains-1048995_1920.jpg"} alt="" width={1920} height={1080} className=" blur-md absolute w-full object-cover h-full"></Image> */}
            <span className=" color-secondaryBlack z-10 h-min text-xl">
              + 5 more
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// async function CrudShowcase() {
//   const session = await getServerAuthSession();
//   if (!session?.user) return null;

//   const latestPost = await api.post.getLatest.query();

//   return (
//     <div className="w-full max-w-xs">
//       {latestPost ? (
//         <p className="truncate">Your most recent post: {latestPost.name}</p>
//       ) : (
//         <p>You have no posts yet.</p>
//       )}

//       <CreatePost />
//     </div>
//   );
// }

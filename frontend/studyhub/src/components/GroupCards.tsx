import Link from "next/link";
import Groups from "@/types/groups";

interface Groups_details{
    groups : Groups
}

export default function GroupCards({groups}: Groups_details) {
  return (
    <Link href={`/groups/${groups.id}`} className="block">
      <div
        className="
          bg-white
          rounded-3xl
          overflow-hidden
          border
          border-slate-200
          shadow-sm
          hover:shadow-xl
          hover:-translate-y-1
          transition-all
          duration-300
        "
      >
        <div className="p-5">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <div><span
                className="
                  text-2xl
                  font-bold
                  text-slate-700
                  line-clamp-1
                "
              >
                {groups.title}
              </span>
              {/* <span
                className="
                  text-slate-500
                  mt-1
                  font-medium
                  line-clamp-1
                "
              >
                Creator ID: {groups.creator_id}
              </span>*/}</div> 
              <span
                className="
                  text-lg
                  font-medium
                  text-emerald-700
                  line-clamp-1
                "
              >
                {groups.topic}
              </span>

              
              
              <span
                className="
                  text-slate-500
                  mt-1
                  font-semibold
                  line-clamp-1
        
                "
              >
                Total Members: {groups.total_member}
              </span>
              <p
                className="
                  text-slate-500
                  mt-1
                  line-clamp-1
                  
                "
              >
                📍 {groups.meeting_location}
              </p>
            </div>
          </div>


          {/* CTA */}

          <div
            className="
              mt-5
              pt-4
              border-t
              border-slate-100
            "
          >
            <span
              className="
                text-blue-600
                font-medium
              "
            >
              View Details →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

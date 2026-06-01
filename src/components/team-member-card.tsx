import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

interface TeamMemberCardProps {
  name: string
  role: string
  image: string
  bio: string
  hobbies: { icon: string; label: string }[]
  discord: string
}

export function TeamMemberCard({ name, role, image, bio, hobbies, discord }: TeamMemberCardProps) {
  return (
    <Card className="group bg-background rounded-2xl shadow-[0_4px_8px_rgba(0,0,0,0.04)] hover:shadow-lg transition-all duration-300 hover:-translate-y-1 focus-within:ring-2 focus-within:ring-accent focus-within:ring-offset-2 h-full flex flex-col">
      <CardContent className="p-6 flex flex-col flex-1">
        <div className="flex flex-col items-center text-center h-full">
          <div className="relative w-32 h-32 mb-4 rounded-full overflow-hidden shadow-md">
            <Image
              src={image || "/placeholder.svg"}
              alt={`Portrait of ${name}, ${role} at Empty Console`}
              fill
              className="object-cover object-center"
              loading="lazy"
              unoptimized
            />
          </div>

          <h3 className="text-2xl font-semibold text-primary mb-1">{name}</h3>
          <p className="text-sm font-medium text-yellow-600 mb-4">{role}</p>

          <p className="text-base text-secondary leading-relaxed mb-6 flex-1">{bio}</p>

          <div className="w-full mb-6">
            <p className="text-sm font-medium text-muted-foreground mb-3">Hobbies</p>
            <div className="flex flex-wrap justify-center gap-2">
              {hobbies.map((hobby) => (
                <span
                  key={hobby.label}
                  className="inline-flex items-center px-3 py-1.5 bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-300 rounded-full text-sm"
                  role="listitem"
                >
                  <span>{hobby.label}</span>
                </span>
              ))}
            </div>
          </div>

          <div className="w-full">
            <p className="text-sm font-medium text-muted-foreground mb-2">Contact</p>
            <div className="flex items-center justify-center gap-2 text-sm">
              <svg className="h-4 w-4 text-yellow-600" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
              </svg>
              <span className="text-primary">{discord}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
